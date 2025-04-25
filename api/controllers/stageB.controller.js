const Project = require('../models/Project.model');
const User = require('../models/User.model');
const logger = require('../utils/logger');
const AppError = require('../utils/appError');

exports.updateStageB = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);
    
    if (!project) {
      return next(new AppError('No project found with that ID', 404));
    }

    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user._id.toString()) {
      return next(new AppError('You do not have permission to update this project', 403));
    }

    if (!project.stageA.completed) {
      return next(new AppError('Stage A must be completed before updating Stage B', 400));
    }

    project.stageB = {
      ...project.stageB,
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
    logger.error(`Error updating Stage B: ${err.message}`);
    next(err);
  }
};

exports.completeStageB = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);
    
    if (!project) {
      return next(new AppError('No project found with that ID', 404));
    }

    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user._id.toString()) {
      return next(new AppError('You do not have permission to update this project', 403));
    }

    if (!project.stageA.completed) {
      return next(new AppError('Stage A must be completed before completing Stage B', 400));
    }

    if (req.body.approvingGeologist && req.body.approvingGeologist.licenseNumber) {
      const geologist = await User.findOne({
        licenseNumber: req.body.approvingGeologist.licenseNumber,
        role: 'hydrogeologist'
      });

      if (!geologist) {
        return next(new AppError('Approving geologist license number is not valid', 400));
      }
    }

    project.stageB = {
      ...project.stageB,
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
    logger.error(`Error completing Stage B: ${err.message}`);
    next(err);
  }
};