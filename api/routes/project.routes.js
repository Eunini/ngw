const express = require('express');
const projectController = require('../controllers/project.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Main project routes
router.route('/')
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

router.route('/:projectId')
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

// Stage completion routes
router.route('/:projectId/stageA')
  .patch(projectController.completeStageA);

router.route('/:projectId/stageB')
  .patch(projectController.completeStageB);

router.route('/:projectId/stageC')
  .patch(projectController.completeStageC);

// Stats and geo routes
router.route('/stats')
  .get(projectController.getProjectStats);

router.route('/within/:distance/center/:latlng/unit/:unit')
  .get(projectController.getProjectsWithin);

// Admin-only routes
router.use(authController.restrictTo('admin'));

module.exports = router;
