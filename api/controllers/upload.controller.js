const cloudinary = require('cloudinary').v2;
const { promisify } = require('util');
const fs = require('fs');
const Project = require('../models/Project.model');
const logger = require('../utils/logger');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = promisify(cloudinary.uploader.upload);

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please upload a file',
      });
    }

    // Check if user has permission to upload for this project
    const project = await Project.findById(req.params.projectId);
    
    if (!project) {
      return res.status(404).json({
        status: 'fail',
        message: 'No project found with that ID',
      });
    }

    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to upload files for this project',
      });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.path, {
      folder: `water-project/${req.params.projectId}`,
      resource_type: 'auto',
    });

    // Remove file from server
    fs.unlinkSync(req.file.path);

    // Add file URL to the appropriate project stage
    const fileUrl = result.secure_url;
    const stage = req.params.stage; // 'stageA', 'stageB', or 'stageC'

    if (!['stageA', 'stageB', 'stageC'].includes(stage)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid stage specified',
      });
    }

    project[stage].files.push(fileUrl);
    await project.save();

    res.status(200).json({
      status: 'success',
      data: {
        fileUrl,
      },
    });
  } catch (err) {
    logger.error(`Error uploading file: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { projectId, stage, fileUrl } = req.params;

    // Check if user has permission
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({
        status: 'fail',
        message: 'No project found with that ID',
      });
    }

    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to delete files for this project',
      });
    }

    // Remove file from Cloudinary
    const publicId = fileUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`water-project/${projectId}/${publicId}`);

    // Remove file reference from project
    if (!['stageA', 'stageB', 'stageC'].includes(stage)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid stage specified',
      });
    }

    project[stage].files = project[stage].files.filter(url => url !== fileUrl);
    await project.save();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    logger.error(`Error deleting file: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getProjectFiles = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    
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
        message: 'You do not have permission to view files for this project',
      });
    }

    const stage = req.params.stage;
    if (!['stageA', 'stageB', 'stageC'].includes(stage)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid stage specified',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        files: project[stage].files,
      },
    });
  } catch (err) {
    logger.error(`Error getting project files: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};