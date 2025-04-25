const Project = require('../models/Project.model');
const logger = require('../utils/logger');
const AppError = require('../utils/appError');

exports.updateStageC = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);
    
    if (!project) {
      return next(new AppError('No project found with that ID', 404));
    }

    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user._id.toString()) {
      return next(new AppError('You do not have permission to update this project', 403));
    }

    if (!project.stageB.completed) {
      return next(new AppError('Stage B must be completed before updating Stage C', 400));
    }

    project.stageC = {
      ...project.stageC,
      waterQuality: req.body.waterQuality || project.stageC.waterQuality,
      recommendation: req.body.recommendation || project.stageC.recommendation,
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
    logger.error(`Error updating Stage C: ${err.message}`);
    next(err);
  }
};

exports.completeStageC = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);
    
    if (!project) {
      return next(new AppError('No project found with that ID', 404));
    }

    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user._id.toString()) {
      return next(new AppError('You do not have permission to update this project', 403));
    }

    if (!project.stageB.completed) {
      return next(new AppError('Stage B must be completed before completing Stage C', 400));
    }

    project.stageC = {
      waterQuality: req.body.waterQuality,
      recommendation: req.body.recommendation,
      completed: true,
      completedAt: Date.now()
    };

    if (project.stageA.completed && project.stageB.completed && project.stageC.completed) {
      project.status = PROJECT_STATUS.COMPLETED;
    }

    await project.save();

    res.status(200).json({
      status: 'success',
      data: {
        project
      }
    });
  } catch (err) {
    logger.error(`Error completing Stage C: ${err.message}`);
    next(err);
  }
};