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

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
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

    // Validate license for professionals
    if (['hydrogeologist', 'engineer', 'driller'].includes(role)) {
      if (!specialization || !licenseType || !licenseNumber) {
        return res.status(400).json({
          status: 'fail',
          message: 'Specialization, license type and number are required for this role',
        });
      }
    }

    // 1. FIRST create Firebase user
    firebaseUser = await firebaseAdmin.auth().createUser({
      email,
      password,
      displayName: name,
      emailVerified: false
    });

    // 2. THEN create MongoDB user
    const newUser = await User.create({
      name,
      email,
      phoneNumber,
      password,
      role,
      specialization,
      licenseType,
      licenseBody,
      licenseNumber,
      state,
      userLGA,
      address,
      firebaseUid: firebaseUser.uid 
    });

    // 3. NOW generate verification link
    // const verificationLink = await firebaseAdmin.auth()
    //   .generateEmailVerificationLink(email);

    // await sendEmail({
    //   email: newUser.email,
    //   subject: 'Verify Your Email',
    //   html: `Please click <a href="${verificationLink}">here</a> to verify your email`
    // });
     
    // Temporarily bypass email verification in development
    if (process.env.NODE_ENV === 'development') {
      await admin.auth().updateUser(firebaseUser.uid, { emailVerified: true });
      newUser.isVerified = true;
      await newUser.save();
    }

    createSendToken(newUser, 201, res);

  } catch (err) {
    logger.error(`Error in register: ${err.message}`);
    
    // Clean up Firebase user if MongoDB creation failed
    if (firebaseUser?.uid) {
      await firebaseAdmin.auth().deleteUser(firebaseUser.uid).catch(e => {
        logger.error(`Failed to cleanup Firebase user: ${e.message}`);
      });
    }

    res.status(400).json({
      status: 'fail',
      message: err.code === 11000 ? 'Email already exists' : err.message
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password',
      });
    }

    // 2) Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password',
      });
    }

    // 3) Check if email is verified
    if (!user.isVerified) {
      return res.status(401).json({
        status: 'fail',
        message: 'Please verify your email first',
      });
    }

    // 4) If everything ok, send token to client
    createSendToken(user, 200, res);
  } catch (err) {
    logger.error(`Error in login: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token and check if it's there
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
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.',
      });
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token does no longer exist.',
      });
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: 'fail',
        message: 'User recently changed password! Please log in again.',
      });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    logger.error(`Error in protect middleware: ${err.message}`);
    res.status(401).json({
      status: 'fail',
      message: 'Invalid token. Please log in again.',
    });
  }
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




