const Project = require('../models/Project.model');
const User = require('../models/User.model');
const logger = require('../utils/logger');
// const { generateProjectId } = require('../utils/generateId');
const mongoose = require('mongoose');


exports.createProject = async (req, res) => {
  try {
    const { name, stageA } = req.body;

    if (!name || !stageA) {
      throw new Error('Project name and stageA data are required');
    }

    // More reliable ID generation
    const generateIdSegment = () => {
      return Math.random().toString(36).substring(2, 8)
        .replace(/[^a-z0-9]/g, '') // Remove special characters
        .toLowerCase(); // Ensure consistent case
    };

    const newProject = await Project.create({
      projectId: `WPRJ-${Date.now()}-${generateIdSegment()}`,
      name,
      createdBy: req.user._id,
      stageA: {
        projectInfo: stageA.projectInfo || {},
        site: stageA.site || {},
        consultant: stageA.consultant || {},
        geology: stageA.geology || {},
        accessibility: stageA.accessibility || {},
      },
    });

    res.status(201).json({
      status: 'success',
      data: {
        project: newProject,
      },
    });
  } catch (err) {
    logger.error(`Error creating project: ${err.stack}`);
    res.status(400).json({
      status: 'fail',
      message: process.env.NODE_ENV === 'development' 
        ? err.message 
        : 'Failed to create project',
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    const { projectId } = req.params; // Now matches your route parameter
    
    // First try finding by projectId (exact match)
    let project = await Project.findOne({ 
      projectId: projectId.trim() 
    }).populate('createdBy', 'name email role');

    if (!project) {
      return res.status(404).json({
        status: 'fail',
        message: 'No project found with that projectId',
      });
    }

    // Authorization check
    if (req.user.role !== 'admin' && project.createdBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to view this project',
      });
    }

    res.status(200).json({
      status: 'success',
      data: { project },
    });
  } catch (err) {
    logger.error(`Error getting project: ${err.stack}`);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    let query = Project.find(JSON.parse(queryStr));

    // If not admin, only show user's projects
    if (req.user.role !== 'admin') {
      query = query.where('createdBy').equals(req.user._id);
    }

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const projects = await query;

    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: {
        projects,
      },
    });
  } catch (err) {
    logger.error(`Error getting all projects: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params; // Changed from id to projectId
    const cleanProjectId = projectId.trim();

    // Find project by projectId first
    let project = await Project.findOne({ projectId: cleanProjectId });

    if (!project) {
      return res.status(404).json({
        status: 'fail',
        message: 'No project found with that projectId',
      });
    }

    // Check permissions
    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to update this project',
      });
    }

    // Update by projectId
    const updatedProject = await Project.findOneAndUpdate(
      { projectId: cleanProjectId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        project: updatedProject,
      },
    });
  } catch (err) {
    logger.error(`Error updating project: ${err.stack}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const cleanProjectId = projectId.trim();

    // Find project by projectId first
    const project = await Project.findOne({ projectId: cleanProjectId });

    if (!project) {
      return res.status(404).json({
        status: 'fail',
        message: 'No project found with that projectId',
      });
    }

    // Check permissions
    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to delete this project',
      });
    }

    // Delete the project
    await Project.findOneAndDelete({ projectId: cleanProjectId });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    logger.error(`Error deleting project: ${err.stack}`);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while deleting project',
    });
  }
};
//   try {
//     const { projectId } = req.params; // Changed from id to projectId
//     const cleanProjectId = projectId.trim();

//     // Find project by projectId first
//     let project = await Project.findOne({ projectId: cleanProjectId });

//     if (!project) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'No project found with that projectId',
//       });
//     }

//     // Check permissions
//     if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         status: 'fail',
//         message: 'You do not have permission to update this project',
//       });
//     }

//     // Update by projectId
//     const updatedProject = await Project.findOneAndUpdate(
//       { projectId: cleanProjectId },
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     res.status(200).json({
//       status: 'success',
//       data: {
//         project: updatedProject,
//       },
//     });
//   } catch (err) {
//     logger.error(`Error updating project: ${err.stack}`);
//     res.status(400).json({
//       status: 'fail',
//       message: err.message,
//     });
//   }
// };

exports.completeStageA = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        status: 'fail',
        message: 'No project found with that ID',
      });
    }

    // Check if user has permission
    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to update this project',
      });
    }

    // Update stage A
    project.stageA = {
      ...project.stageA,
      ...req.body,
      completed: true,
      completedAt: Date.now(),
    };

    await project.save();

    res.status(200).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (err) {
    logger.error(`Error completing stage A: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.completeStageB = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        status: 'fail',
        message: 'No project found with that ID',
      });
    }

    // Check if user has permission
    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to update this project',
      });
    }

    // Check if stage A is completed
    if (!project.stageA.completed) {
      return res.status(400).json({
        status: 'fail',
        message: 'Stage A must be completed before proceeding to Stage B',
      });
    }

    // Verify geologist license if provided
    if (req.body.approvingGeologist && req.body.approvingGeologist.licenseNumber) {
      const geologist = await User.findOne({
        licenseNumber: req.body.approvingGeologist.licenseNumber,
        role: 'hydrogeologist',
      });

      if (!geologist) {
        return res.status(400).json({
          status: 'fail',
          message: 'Approving geologist license number is not valid',
        });
      }
    }

    // Update stage B
    project.stageB = {
      ...project.stageB,
      ...req.body,
      completed: true,
      completedAt: Date.now(),
    };

    await project.save();

    res.status(200).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (err) {
    logger.error(`Error completing stage B: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.completeStageC = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        status: 'fail',
        message: 'No project found with that ID',
      });
    }

    // Check if user has permission
    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to update this project',
      });
    }

    // Check if stage B is completed
    if (!project.stageB.completed) {
      return res.status(400).json({
        status: 'fail',
        message: 'Stage B must be completed before proceeding to Stage C',
      });
    }

    // Update stage C
    project.stageC = {
      waterQuality: req.body.waterQuality,
      recommendation: req.body.recommendation,
      completed: true,
      completedAt: Date.now(),
    };

    // Mark project as completed if all stages are done
    if (project.stageA.completed && project.stageB.completed && project.stageC.completed) {
      project.status = 'completed';
    }

    await project.save();

    res.status(200).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (err) {
    logger.error(`Error completing stage C: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getProjectStats = async (req, res) => {
  try {
    const stats = await Project.aggregate([
      {
        $match: { createdBy: mongoose.Types.ObjectId(req.user._id) }
      },
      {
        $group: {
          _id: '$status',
          numProjects: { $sum: 1 },
          avgBudget: { $avg: '$stageA.projectInfo.budget' },
          minBudget: { $min: '$stageA.projectInfo.budget' },
          maxBudget: { $max: '$stageA.projectInfo.budget' }
        }
      },
      {
        $sort: { numProjects: -1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (err) {
    logger.error(`Error getting project stats: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getProjectsWithin = async (req, res) => {
  try {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

    if (!lat || !lng) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide latitude and longitude in the format lat,lng'
      });
    }

    const projects = await Project.find({
      'stageA.site.coordinates': {
        $geoWithin: { $centerSphere: [[lng, lat], radius] }
      }
    });

    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: {
        projects
      }
    });
  } catch (err) {
    logger.error(`Error getting projects within radius: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};