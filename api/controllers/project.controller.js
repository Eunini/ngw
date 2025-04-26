const Project = require('../models/Project.model');
const User = require('../models/User.model');
const logger = require('../utils/logger');
const mongoose = require('mongoose');

const {
  validateStageA,
  validateStageB1,
  validateStageB2,
} = require('../utils/validators');

// Helper function for consistent error responses
const handleError = (res, error, context) => {
  logger.error(`Error in ${context}: ${error.stack}`);
  const statusCode = error.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'development'
      ? error.message
      : `An error occurred during ${context}. Please try again.`;

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

// Helper to check project permissions
const checkProjectPermissions = (project, user) => {
  if (
    user.role !== 'admin' &&
    project.createdBy.toString() !== user._id.toString()
  ) {
    const error = new Error('Unauthorized: You do not have permission to access this project');
    error.statusCode = 403;
    throw error;
  }
};

// Generate a unique project ID (e.g., "WPRJ-2023ABCD-1234")
const generateProjectId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `WPRJ-${timestamp}-${randomStr}`;
};

const projectController = {
  /**
   * @desc    Create a new project
   * @route   POST /api/v1/projects
   * @access  Private
   */
  createProject: async (req, res) => {
    try {
      const { name, client } = req.body;

      if (!name || !client) {
        const error = new Error('Project name and client information are required');
        error.statusCode = 400;
        throw error;
      }

      const newProject = await Project.create({
        projectId: generateProjectId(),
        name,
        client,
        createdBy: req.user._id,
        status: 'draft',
        currentStage: 'A',
      });

      res.status(201).json({
        status: 'success',
        data: {
          project: newProject,
        },
      });
    } catch (err) {
      handleError(res, err, 'project creation');
    }
  },

  /**
   * @desc    Get a single project by ID
   * @route   GET /api/v1/projects/:projectId
   * @access  Private
   */
  getProject: async (req, res) => {
    try {
      const { projectId } = req.params;

      const project = await Project.findOne({ projectId: projectId.trim() })
        .populate('createdBy', 'name email role')
        .populate('stageB.approvingGeologist', 'name licenseNumber');

      if (!project) {
        const error = new Error('Project not found');
        error.statusCode = 404;
        throw error;
      }

      checkProjectPermissions(project, req.user);

      res.status(200).json({
        status: 'success',
        data: { project },
      });
    } catch (err) {
      handleError(res, err, 'fetching project');
    }
  },

  /**
   * @desc    Get all projects (with filtering, sorting, pagination)
   * @route   GET /api/v1/projects
   * @access  Private
   */
  getAllProjects: async (req, res) => {
    try {
      // 1) Filtering
      const filter = {};
      if (req.user.role !== 'admin') {
        filter.createdBy = req.user._id;
      }
      if (req.query.status) {
        filter.status = req.query.status;
      }
      if (req.query.stage) {
        filter.currentStage = req.query.stage.toUpperCase();
      }

      // 2) Sorting
      const sortBy = req.query.sort || '-createdAt';

      // 3) Pagination
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 20;
      const skip = (page - 1) * limit;

      // Execute query
      const projects = await Project.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'name email');

      const totalProjects = await Project.countDocuments(filter);

      res.status(200).json({
        status: 'success',
        results: projects.length,
        pagination: {
          page,
          limit,
          total: totalProjects,
          pages: Math.ceil(totalProjects / limit),
        },
        data: { projects },
      });
    } catch (err) {
      handleError(res, err, 'fetching projects');
    }
  },

  /**
   * @desc    Update project basic info (name, client)
   * @route   PATCH /api/v1/projects/:projectId
   * @access  Private
   */
  updateProjectBasicInfo: async (req, res) => {
    try {
      const { projectId } = req.params;
      const { name, client } = req.body;

      const project = await Project.findOne({ projectId: projectId.trim() });
      if (!project) {
        const error = new Error('Project not found');
        error.statusCode = 404;
        throw error;
      }

      checkProjectPermissions(project, req.user);

      // Only allow updates in draft status
      if (project.status !== 'draft') {
        const error = new Error('Project can only be updated in draft status');
        error.statusCode = 400;
        throw error;
      }

      // Update fields if provided
      if (name) project.name = name;
      if (client) project.client = client;

      await project.save();

      res.status(200).json({
        status: 'success',
        data: { project },
      });
    } catch (err) {
      handleError(res, err, 'updating project');
    }
  },

  /**
   * @desc    Submit Stage A data
   * @route   POST /api/v1/projects/:projectId/stage-a
   * @access  Private
   */
  submitStageA: async (req, res) => {
    try {
      const { projectId } = req.params;
      const stageAData = req.body;

      // Validate input
      const validationError = validateStageA(stageAData);
      if (validationError) {
        validationError.statusCode = 400;
        throw validationError;
      }

      const project = await Project.findOne({ projectId: projectId.trim() });
      if (!project) {
        const error = new Error('Project not found');
        error.statusCode = 404;
        throw error;
      }

      checkProjectPermissions(project, req.user);

      // Update stage A data
      project.stageA = {
        ...stageAData,
        submittedAt: new Date(),
        submittedBy: req.user._id,
        completed: true,
        completedAt: new Date(),
      };

      project.currentStage = 'B'; // Move to next stage
      await project.save();

      res.status(200).json({
        status: 'success',
        data: { project },
      });
    } catch (err) {
      handleError(res, err, 'submitting Stage A');
    }
  },

  /**
   * @desc    Submit Stage B1 data
   * @route   POST /api/v1/projects/:projectId/stage-b1
   * @access  Private
   */
  submitStageB1: async (req, res) => {
    try {
      const { projectId } = req.params;
      const stageB1Data = req.body;

      // Validate input
      const validationError = validateStageB1(stageB1Data);
      if (validationError) {
        validationError.statusCode = 400;
        throw validationError;
      }

      const project = await Project.findOne({ projectId: projectId.trim() });
      if (!project) {
        const error = new Error('Project not found');
        error.statusCode = 404;
        throw error;
      }

      checkProjectPermissions(project, req.user);

      // Verify Stage A is completed
      if (!project.stageA?.completed) {
        const error = new Error('Stage A must be completed before submitting Stage B1');
        error.statusCode = 400;
        throw error;
      }

      // Update stage B1 data
      project.stageB = project.stageB || {};
      project.stageB.drilling = {
        ...stageB1Data,
        submittedAt: new Date(),
        submittedBy: req.user._id,
        completed: true,
        completedAt: new Date(),
      };

      await project.save();

      res.status(200).json({
        status: 'success',
        data: { project },
      });
    } catch (err) {
      handleError(res, err, 'submitting Stage B1');
    }
  },

  /**
   * @desc    Submit Stage B2 data
   * @route   POST /api/v1/projects/:projectId/stage-b2
   * @access  Private
   */
  submitStageB2: async (req, res) => {
    try {
      const { projectId } = req.params;
      const stageB2Data = req.body;

      // Validate input
      const validationError = validateStageB2(stageB2Data);
      if (validationError) {
        validationError.statusCode = 400;
        throw validationError;
      }

      const project = await Project.findOne({ projectId: projectId.trim() });
      if (!project) {
        const error = new Error('Project not found');
        error.statusCode = 404;
        throw error;
      }

      checkProjectPermissions(project, req.user);

      // Verify Stage B1 is completed
      if (!project.stageB?.drilling?.completed) {
        const error = new Error('Stage B1 must be completed before submitting Stage B2');
        error.statusCode = 400;
        throw error;
      }

      // Update stage B2 data
      project.stageB.installation = {
        ...stageB2Data,
        submittedAt: new Date(),
        submittedBy: req.user._id,
        completed: true,
        completedAt: new Date(),
      };

      project.stageB.completed = true;
      project.currentStage = 'C'; // Move to next stage
      await project.save();

      res.status(200).json({
        status: 'success',
        data: { project },
      });
    } catch (err) {
      handleError(res, err, 'submitting Stage B2');
    }
  },

  /**
   * @desc    Approve a project stage (Admin only)
   * @route   POST /api/v1/projects/:projectId/approve/:stage
   * @access  Private (Admin)
   */
  approveStage: async (req, res) => {
    try {
      const { projectId, stage } = req.params;
      const { approved, comments } = req.body;

      if (typeof approved !== 'boolean') {
        const error = new Error('Approval status must be a boolean');
        error.statusCode = 400;
        throw error;
      }

      const project = await Project.findOne({ projectId: projectId.trim() });
      if (!project) {
        const error = new Error('Project not found');
        error.statusCode = 404;
        throw error;
      }

      // Only admin can approve stages
      if (req.user.role !== 'admin') {
        const error = new Error('Only administrators can approve stages');
        error.statusCode = 403;
        throw error;
      }

      const stageUpper = stage.toUpperCase();
      const stagePath = `stage${stageUpper}`;

      // Validate stage exists
      if (!project[stagePath]) {
        const error = new Error(`Stage ${stageUpper} data not submitted yet`);
        error.statusCode = 400;
        throw error;
      }

      // Update approval status
      project[stagePath].approved = approved;
      project[stagePath].approvedAt = new Date();
      project[stagePath].approvedBy = req.user._id;
      project[stagePath].comments = comments;

      if (approved) {
        // Move to next stage if approved
        const nextStage = String.fromCharCode(stageUpper.charCodeAt(0) + 1);
        project.currentStage = nextStage;
      } else {
        // Mark as rejected if not approved
        project.status = 'rejected';
        if (stageUpper === 'B') {
          project.stageB.failed = true;
        }
      }

      await project.save();

      res.status(200).json({
        status: 'success',
        data: { project },
      });
    } catch (err) {
      handleError(res, err, 'approving stage');
    }
  },

  /**
   * @desc    Delete a project
   * @route   DELETE /api/v1/projects/:projectId
   * @access  Private
   */
  deleteProject: async (req, res) => {
    try {
      const { projectId } = req.params;

      const project = await Project.findOne({ projectId: projectId.trim() });
      if (!project) {
        const error = new Error('Project not found');
        error.statusCode = 404;
        throw error;
      }

      checkProjectPermissions(project, req.user);

      // Only allow deletion in draft or rejected status
      if (!['draft', 'rejected'].includes(project.status)) {
        const error = new Error('Only draft or rejected projects can be deleted');
        error.statusCode = 400;
        throw error;
      }

      await Project.deleteOne({ projectId: projectId.trim() });

      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (err) {
      handleError(res, err, 'deleting project');
    }
  },

  /**
   * @desc    Get project statistics
   * @route   GET /api/v1/projects/stats
   * @access  Private
   */
  getProjectStats: async (req, res) => {
    try {
      const matchCriteria = req.user.role === 'admin' ? {} : { createdBy: req.user._id };

      const stats = await Project.aggregate([
        { $match: matchCriteria },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            stages: {
              $push: {
                stage: '$currentStage',
                projectId: '$projectId',
              },
            },
          },
        },
        {
          $project: {
            status: '$_id',
            count: 1,
            stages: 1,
            _id: 0,
          },
        },
        { $sort: { count: -1 } },
      ]);

      res.status(200).json({
        status: 'success',
        data: { stats },
      });
    } catch (err) {
      handleError(res, err, 'fetching project statistics');
    }
  }
};

module.exports = projectController;