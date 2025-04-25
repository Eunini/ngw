const User = require('../models/User.model');
const Project = require('../models/Project.model');
const logger = require('../utils/logger');

exports.getUserStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          numUsers: { $sum: 1 }
        }
      },
      {
        $sort: { numUsers: -1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: { stats }
    });
  } catch (err) {
    logger.error(`Error getting user stats: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -__v');

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (err) {
    logger.error(`Error getting all users: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -__v');

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    logger.error(`Error getting user: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Prevent password updates via this route
    if (req.body.password) {
      return res.status(400).json({
        status: 'fail',
        message: 'This route is not for password updates. Please use /updateMyPassword.'
      });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('-password -__v');

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    logger.error(`Error updating user: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    logger.error(`Error deleting user: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.verifyLicense = async (req, res) => {
  try {
    const { userId, status } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }

    if (!['hydrogeologist', 'engineer', 'driller'].includes(user.role)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Only professionals require license verification'
      });
    }

    user.licenseVerified = status === 'approve';
    await user.save();

    // Send email notification
    const message = status === 'approve' 
      ? 'Your professional license has been approved. You can now access all features.'
      : 'Your professional license verification was rejected. Please update your license information.';

    await sendEmail({
      email: user.email,
      subject: 'License Verification Update',
      message
    });

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    logger.error(`Error verifying license: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getProjectAnalytics = async (req, res) => {
  try {
    const projectsByStatus = await Project.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const projectsByState = await Project.aggregate([
      {
        $group: {
          _id: '$stageA.site.state',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const projectsByMonth = await Project.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        byStatus: projectsByStatus,
        byState: projectsByState,
        byMonth: projectsByMonth
      }
    });
  } catch (err) {
    logger.error(`Error getting project analytics: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.cleanupDemoData = async (req, res) => {
  try {
    // Delete demo users
    await User.deleteMany({ email: /@demo\.waterproject\.com$/ });

    // Delete demo projects
    await Project.deleteMany({ name: /^DEMO - / });

    res.status(200).json({
      status: 'success',
      message: 'Demo data cleaned up successfully'
    });
  } catch (err) {
    logger.error(`Error cleaning up demo data: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};