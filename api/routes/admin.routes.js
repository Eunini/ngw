const express = require('express');
const adminController = require('../controllers/admin.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();

// Public admin login
router.post('/login', authController.login);

// Protect all routes and restrict to admin only
router.use(authController.protect, authController.restrictTo('admin'));

router.route('/users')
  .get(adminController.getAllUsers);

router.route('/users/:id')
  .get(adminController.getUser)
  .patch(adminController.updateUser)
  .delete(adminController.deleteUser);

router.route('/verify-license')
  .post(adminController.verifyLicense);

router.route('/analytics/projects')
  .get(adminController.getProjectAnalytics);

router.route('/analytics/users')
  .get(adminController.getUserStats);

router.route('/cleanup-demo')
  .delete(adminController.cleanupDemoData);

module.exports = router;