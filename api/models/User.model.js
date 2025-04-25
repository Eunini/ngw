const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); // required for token generation

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide your Phone Number'],
    unique: true,
    validate: [validator.isMobilePhone, 'Please provide a valid phone number'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'hydrogeologist', 'engineer', 'driller', 'contractor', 'drilling_company', 'user'],
    required: [true, 'Please select a role'],
  },
  specialization: {
    type: String,
    required: function () {
      return ['hydrogeologist', 'engineer', 'driller'].includes(this.role);
    },
  },
  licenseType: {
    type: String,
    required: function () {
      return ['hydrogeologist', 'engineer', 'driller'].includes(this.role);
    },
  },
  licenseBody: {
    type: String,
    required: [true, 'Please provide name of license body'],
    trim: true,
  },
  licenseNumber: {
    type: String,
    required: function () {
      return ['hydrogeologist', 'engineer', 'driller'].includes(this.role);
    },
    unique: true,
  },
  state: {
    type: String,
    required: [true, 'Please provide your state'],
  },
  userLGA: {
    type: String,
    required: [true, 'Please provide your LGA'],
  },
  address: {
    type: String,
    required: [true, 'Please provide your address'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  passwordChangedAt: {
    type: Date,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
// Add this to your User model methods
userSchema.methods.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

//Password Change Timestamp
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000; // Subtract 1s to ensure token is created after
  next();
});

// Method to create a password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// used to change password after for token verification
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;