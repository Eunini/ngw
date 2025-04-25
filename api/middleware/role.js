const { ROLES } = require('../config/constants');
const AppError = require('../utils/appError');

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.verifyProfessionalLicense = async (req, res, next) => {
  try {
    const user = req.user;
    
    if ([ROLES.HYDROGEOLOGIST, ROLES.ENGINEER, ROLES.DRILLER].includes(user.role)) {
      if (!user.licenseVerified) {
        return next(
          new AppError('Your professional license has not been verified', 403)
        );
      }
    }
    
    next();
  } catch (err) {
    next(err);
  }
};