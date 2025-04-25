const Project = require('../models/Project.model');
const Report = require('../models/Report.model');
const logger = require('../utils/logger');
const AppError = require('../utils/appError');

exports.generateReportRecord = async (projectId, userId, type, fileUrl, params = {}) => {
  try {
    const report = await Report.create({
      project: projectId,
      type,
      generatedBy: userId,
      fileUrl,
      parameters: params
    });

    return report;
  } catch (err) {
    logger.error(`Error generating report record: ${err.message}`);
    throw new AppError('Error generating report record', 500);
  }
};

exports.getProjectReports = async (projectId, userId, isAdmin = false) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);
    
    if (!isAdmin && project.createdBy.toString() !== userId.toString()) {
      throw new AppError('Unauthorized access to project reports', 403);
    }

    return await Report.find({ project: projectId })
      .sort('-generatedAt')
      .populate('generatedBy', 'name email role');
  } catch (err) {
    logger.error(`Error getting project reports: ${err.message}`);
    throw err;
  }
};