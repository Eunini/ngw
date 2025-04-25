const express = require('express');
const reportController = require('../controllers/report.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.route('/project-summary/:projectId')
  .get(reportController.generateProjectSummary);

router.route('/geological/:projectId')
  .get(reportController.generateGeologicalReport);

router.route('/drilling/:projectId')
  .get(reportController.generateDrillingReport);

router.route('/monthly-log/:year/:month')
  .get(reportController.generateMonthlyWorkLog);

module.exports = router;