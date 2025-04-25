const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const firebaseAdmin = require('firebase-admin');
const logger = require('../utils/logger');
const sendEmail = require('../services/email.service');
const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('../config/firebase-service-account.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

// In your auth.controller.js, update the signToken function:
const signToken = (id) => {
  console.log(`Signing token with secret: ${process.env.JWT_SECRET.substring(0, 5)}...`); // Log first 5 chars
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
    algorithm: 'HS256' // Explicitly set algorithm
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  console.log("Generated token:", token);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.register = async (req, res, next) => {
  let firebaseUser;

  try {
    const { name, email, phoneNumber, password, role, specialization, licenseType, licenseBody, licenseNumber, state, userLGA, address } = req.body;

    // Validate professional fields if required
    if (['hydrogeologist', 'engineer', 'driller'].includes(role)) {
      if (!specialization || !licenseType || !licenseNumber) {
        return next(new AppError('Specialization, license type and number are required for this role', 400));
      }
    }

    // Skip verification for admin in development
    const isAdmin = role === 'admin';
    const emailVerified = isAdmin && process.env.NODE_ENV === 'development';

    // Create Firebase user
    firebaseUser = await firebaseAdmin.auth().createUser({
      email,
      password,
      displayName: name,
      emailVerified
    });

    // Create MongoDB user
    const newUser = await User.create({
      name,
      email,
      phoneNumber,
      password,
      role,
      specialization: isAdmin ? 'N/A' : specialization,
      licenseType: isAdmin ? 'N/A' : licenseType,
      licenseBody: isAdmin ? 'N/A' : licenseBody,
      licenseNumber: isAdmin ? 'ADMIN-' + crypto.randomBytes(4).toString('hex') : licenseNumber,
      state,
      userLGA,
      address,
      firebaseUid: firebaseUser.uid,
      isVerified: isAdmin || emailVerified
    });

    // Skip email verification for admin in development
    if (isAdmin && process.env.NODE_ENV === 'development') {
      await firebaseAdmin.auth().updateUser(firebaseUser.uid, { emailVerified: true });
    }

    createSendToken(newUser, 201, res);

  } catch (err) {
    logger.error(`Registration error: ${err.message}`);
    
    // Cleanup Firebase user if MongoDB creation failed
    if (firebaseUser?.uid) {
      await firebaseAdmin.auth().deleteUser(firebaseUser.uid).catch(e => {
        logger.error(`Firebase cleanup error: ${e.message}`);
      });
    }

    if (err.code === 11000) {
      return next(new AppError('Email or phone number already exists', 400));
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Trim and validate input
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ 
        status: 'fail', 
        message: 'Email and password required' 
      });
    }

    // 2. Find user (case-insensitive email)
    const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${email.trim()}$`, 'i') }
    }).select('+password');

    // 3. Debug logging (remove after fixing)
    console.log({
      inputEmail: email,
      inputPass: password,
      dbUser: user ? { 
        email: user.email, 
        passHash: user.password?.substring(0, 10) + '...' 
      } : null
    });

    // 4. Verify user exists and password matches
    if (!user || !(await user.correctPassword(password.trim()))) {
      return res.status(401).json({ 
        status: 'fail', 
        message: 'Invalid credentials' 
      });
    }

    // 5. Success
    createSendToken(user, 200, res);

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      status: 'error', 
      message: 'Internal server error' 
    });
  }
};

exports.protect = async (req, res, next) => {
  // 1) Getting token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in.', 401));
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('User no longer exists', 401));
  }

  // 4) Check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('Password changed recently! Please log in again.', 401));
  }

  // Grant access
  req.user = currentUser;
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action',
      });
    }
    next();
  };
};

exports.forgotPassword = async (req, res, next) => {
  try {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'There is no user with that email address.',
      });
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/resetPassword/${resetToken}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message: `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`,
      });

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      logger.error(`Error sending email: ${err.message}`);
      return res.status(500).json({
        status: 'fail',
        message: 'There was an error sending the email. Try again later!',
      });
    }
  } catch (err) {
    logger.error(`Error in forgotPassword: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'Token is invalid or has expired',
      });
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    createSendToken(user, 200, res);
  } catch (err) {
    logger.error(`Error in resetPassword: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select('+password');

    // 2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Your current password is wrong.',
      });
    }

    // 3) If so, update password
    user.password = req.body.password;
    await user.save();

    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
  } catch (err) {
    logger.error(`Error in updatePassword: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};




