const User = require('../models/User.model');
const { admin } = require('../config/firebase');
const logger = require('../utils/logger');
const AppError = require('../utils/appError');

exports.verifyUserEmail = async (email) => {
  try {
    await admin.auth().updateUserByEmail(email, { emailVerified: true });
    await User.findOneAndUpdate({ email }, { isVerified: true });
    return true;
  } catch (err) {
    logger.error(`Error verifying email: ${err.message}`);
    throw new AppError('Error verifying email', 500);
  }
};

exports.checkLicenseValidity = async (licenseNumber, role) => {
  try {
    // Implement license verification logic with external API if needed
    return true;
  } catch (err) {
    logger.error(`Error checking license: ${err.message}`);
    throw new AppError('Error verifying professional license', 500);
  }
};