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

exports.checkProjectAccess = async (projectId, userId, isAdmin = false) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);
    if (!isAdmin && project.createdBy.toString() !== userId.toString()) {
      throw new AppError('Unauthorized access to project', 403);
    }
    return project;
  } catch (err) {
    logger.error(`Error checking project access: ${err.message}`);
    throw err;
  }
};