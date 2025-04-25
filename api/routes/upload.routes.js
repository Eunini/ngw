const express = require('express');
const uploadController = require('../controllers/upload.controller');
const authController = require('../controllers/auth.controller');
const upload = require('../utils/multer');
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.route('/:projectId/:stage')
  .post(upload.single('file'), uploadController.uploadFile)
  .get(uploadController.getProjectFiles);

router.route('/:projectId/:stage/:fileUrl')
  .delete(uploadController.deleteFile);

module.exports = router;