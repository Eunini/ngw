const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide a project name'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed'],
    default: 'ongoing',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  stageA: {
    projectInfo: {
      description: String,
      purpose: String,
      fundingSource: String,
      budget: Number,
      startDate: Date,
      endDate: Date,
    },
    site: {
      state: String,
      lga: String,
      town: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    consultant: {
      name: String,
      company: String,
      contact: String,
    },
    geology: {
      rockType: String,
      aquiferType: String,
      previousStudies: String,
    },
    accessibility: {
      roadCondition: String,
      nearestTownDistance: Number,
      terrainType: String,
    },
    files: [String], // Array of file URLs
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: Date,
  },
  stageB: {
    drillingInfo: {
      method: String,
      depth: Number,
      diameter: Number,
      casingType: String,
      screenType: String,
      gravelPack: String,
      developmentMethod: String,
      yield: Number,
      staticWaterLevel: Number,
    },
    approvals: {
      environmentalApproval: Boolean,
      communityApproval: Boolean,
      regulatoryApproval: Boolean,
    },
    approvingGeologist: {
      name: String,
      licenseNumber: String,
      date: Date,
    },
    files: [String], // Array of file URLs
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: Date,
  },
  stageC: {
    waterQuality: [
      {
        parameter: String,
        value: Number,
        unit: String,
        standard: Number,
        remark: String,
      },
    ],
    recommendation: String,
    files: [String], // Array of file URLs
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Update the updatedAt field before saving
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// autogenerate ProjectId
projectSchema.pre('save', async function(next) {
  if (!this.projectId) {
    this.projectId = await generateProjectId();
  }
  next();
});

// Generate project ID before saving
projectSchema.pre('save', async function(next) {
  if (!this.projectId) {
    this.projectId = await generateProjectId();
  }
  next();
});

// Virtual for project duration
projectSchema.virtual('duration').get(function() {
  if (this.stageA.projectInfo.startDate && this.stageA.projectInfo.endDate) {
    return (this.stageA.projectInfo.endDate - this.stageA.projectInfo.startDate) / (1000 * 60 * 60 * 24);
  }
  return null;
});

// Static method to generate project ID
async function generateProjectId() {
  const count = await mongoose.model('Project').countDocuments();
  return `WPRJ-${(count + 1).toString().padStart(5, '0')}`;
}

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;