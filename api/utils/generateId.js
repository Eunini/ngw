const Project = require('../models/Project.model');
const logger = require('../utils/logger');
const AppError = require('../utils/appError');

exports.generateProjectId = async () => {
  try {
    const count = await Project.countDocuments();
    return `WPRJ-${(count + 1).toString().padStart(5, '0')}`;
  } catch (err) {
    logger.error(`Error generating project ID: ${err.message}`);
    throw new AppError('Error generating project ID', 500);
  }
};

exports.generateReportId = async () => {
  try {
    const count = await require('../models/Report.model').countDocuments();
    return `REP-${(count + 1).toString().padStart(5, '0')}`;
  } catch (err) {
    logger.error(`Error generating report ID: ${err.message}`);
    throw new AppError('Error generating report ID', 500);
  }
};