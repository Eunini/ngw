const mongoose = require('mongoose');
const { FILE_TYPES } = require('../config/constants');

const uploadSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  stage: {
    type: String,
    enum: ['stageA', 'stageB', 'stageC'],
    required: true
  },
  fileType: {
    type: String,
    enum: Object.values(FILE_TYPES),
    required: true
  },
  url: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Upload', uploadSchema);