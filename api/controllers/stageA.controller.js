const Project = require('../models/Project.model');
const logger = require('../utils/logger');
const AppError = require('../utils/appError');

exports.updateStageA = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);
    
    if (!project) {
      return next(new AppError('No project found with that ID', 404));
    }

    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user._id.toString()) {
      return next(new AppError('You do not have permission to update this project', 403));
    }

    project.stageA = {
      ...project.stageA,
      ...req.body,
      updatedAt: Date.now()
    };

    await project.save();

    res.status(200).json({
      status: 'success',
      data: {
        project
      }
    });
  } catch (err) {
    logger.error(`Error updating Stage A: ${err.message}`);
    next(err);
  }
};

exports.completeStageA = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);
    
    if (!project) {
      return next(new AppError('No project found with that ID', 404));
    }

    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user._id.toString()) {
      return next(new AppError('You do not have permission to update this project', 403));
    }

    project.stageA = {
      ...project.stageA,
      ...req.body,
      completed: true,
      completedAt: Date.now()
    };

    await project.save();

    res.status(200).json({
      status: 'success',
      data: {
        project
      }
    });
  } catch (err) {
    logger.error(`Error completing Stage A: ${err.message}`);
    next(err);
  }
};