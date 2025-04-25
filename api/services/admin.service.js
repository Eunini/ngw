const User = require('../models/User.model');
const Project = require('../models/Project.model');
const logger = require('../utils/logger');
const AppError = require('../utils/appError');

exports.cleanupInactiveUsers = async (days = 30) => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const result = await User.deleteMany({
      isVerified: false,
      createdAt: { $lt: cutoffDate }
    });

    return result;
  } catch (err) {
    logger.error(`Error cleaning up inactive users: ${err.message}`);
    throw new AppError('Error cleaning up inactive users', 500);
  }
};

exports.getPlatformStatistics = async () => {
  try {
    const usersCount = await User.countDocuments();
    const projectsCount = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: 'ongoing' });

    return {
      usersCount,
      projectsCount,
      activeProjects
    };
  } catch (err) {
    logger.error(`Error getting platform statistics: ${err.message}`);
    throw new AppError('Error getting platform statistics', 500);
  }
};