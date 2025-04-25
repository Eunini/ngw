const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  type: {
    type: String,
    enum: ['summary', 'geological', 'drilling', 'installation', 'media', 'monthly'],
    required: true
  },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  generatedAt: {
    type: Date,
    default: Date.now
  },
  parameters: {
    type: Object,
    default: {}
  }
});

module.exports = mongoose.model('Report', reportSchema);
