const Joi = require('joi');
const { ValidationError } = require('./error');

// Common validation schemas
const addressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  postalCode: Joi.string().required(),
  country: Joi.string().required(),
});

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
});

const coordinatesSchema = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
});

/**
 * Validate Stage A data (Site Assessment)
 */
const validateStageA = (data) => {
  const schema = Joi.object({
    siteAddress: addressSchema.required(),
    siteCoordinates: coordinatesSchema.required(),
    sitePhotos: Joi.array().items(Joi.string().uri()).min(1).required(),
    geologicalAssessment: Joi.object({
      soilType: Joi.string().valid('clay', 'sand', 'silt', 'loam', 'rock', 'other').required(),
      stability: Joi.string().valid('high', 'medium', 'low').required(),
      waterTableDepth: Joi.number().min(0).required(),
      contaminationRisk: Joi.string().valid('none', 'low', 'medium', 'high').required(),
      notes: Joi.string().max(1000),
    }).required(),
    environmentalFactors: Joi.object({
      floodRisk: Joi.boolean().required(),
      protectedSpecies: Joi.boolean().required(),
      protectedArea: Joi.boolean().required(),
      notes: Joi.string().max(1000),
    }).required(),
    accessibility: Joi.object({
      roadAccess: Joi.boolean().required(),
      clearance: Joi.number().min(0).required(), // in meters
      restrictions: Joi.array().items(Joi.string()),
    }).required(),
    clientContact: contactSchema.required(),
    assessmentDate: Joi.date().max('now').required(),
  });

  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    const messages = error.details.map((detail) => detail.message).join('; ');
    return new ValidationError(`Stage A validation failed: ${messages}`);
  }

  return null;
};

/**
 * Validate Stage B1 data (Drilling Phase)
 */
const validateStageB1 = (data) => {
  const schema = Joi.object({
    drillingLogs: Joi.array()
      .items(
        Joi.object({
          depth: Joi.number().min(0).max(500).required(), // in meters
          diameter: Joi.number().min(0.1).max(2).required(), // in meters
          material: Joi.string().required(),
          notes: Joi.string().max(500),
        })
      )
      .min(1)
      .required(),
    drillingEquipment: Joi.object({
      rigType: Joi.string().valid('rotary', 'percussion', 'directional', 'other').required(),
      rigId: Joi.string().required(),
      operator: Joi.string().required(),
    }).required(),
    drillingParameters: Joi.object({
      startDate: Joi.date().required(),
      endDate: Joi.date().min(Joi.ref('startDate')).required(),
      maxDepth: Joi.number().min(0).required(),
      averageRate: Joi.number().min(0).required(), // meters/hour
      issues: Joi.array().items(Joi.string()),
    }).required(),
    casingDetails: Joi.object({
      material: Joi.string().required(),
      diameter: Joi.number().min(0.1).required(),
      depthInstalled: Joi.number().min(0).required(),
      groutType: Joi.string().required(),
    }).required(),
    waterQualitySamples: Joi.array()
      .items(
        Joi.object({
          depth: Joi.number().min(0).required(),
          parameters: Joi.array().items(Joi.string()),
          results: Joi.object().pattern(Joi.string(), Joi.number()),
        })
      )
      .min(1),
    safetyChecks: Joi.array().items(Joi.string()).min(1).required(),
  });

  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    const messages = error.details.map((detail) => detail.message).join('; ');
    return new ValidationError(`Stage B1 validation failed: ${messages}`);
  }

  return null;
};

/**
 * Validate Stage B2 data (Installation Phase)
 */
const validateStageB2 = (data) => {
  const schema = Joi.object({
    installationDetails: Joi.object({
      startDate: Joi.date().required(),
      endDate: Joi.date().min(Joi.ref('startDate')).required(),
      pumpType: Joi.string().valid('submersible', 'jet', 'hand', 'solar', 'other').required(),
      pumpSpecs: Joi.object({
        flowRate: Joi.number().min(0).required(), // m³/hour
        power: Joi.number().min(0), // kW
        depth: Joi.number().min(0).required(), // meters
      }).required(),
      materialsUsed: Joi.array().items(Joi.string()).min(1).required(),
    }).required(),
    performanceTests: Joi.array()
      .items(
        Joi.object({
          testType: Joi.string().required(),
          duration: Joi.number().min(0).required(), // minutes
          flowRate: Joi.number().min(0).required(), // m³/hour
          drawdown: Joi.number().min(0).required(), // meters
          recoveryRate: Joi.number().min(0).required(), // meters/hour
        })
      )
      .min(1)
      .required(),
    approvingGeologist: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .message('Invalid geologist ID format')
      .required(),
    certificationPhotos: Joi.array().items(Joi.string().uri()).min(1).required(),
    finalDepth: Joi.number().min(0).required(),
    yield: Joi.number().min(0).required(), // m³/hour
    staticWaterLevel: Joi.number().min(0).required(),
    dynamicWaterLevel: Joi.number().min(0).required(),
    maintenancePlan: Joi.object({
      frequency: Joi.string().valid('weekly', 'monthly', 'quarterly', 'biannually', 'annually').required(),
      tasks: Joi.array().items(Joi.string()).min(1).required(),
    }).required(),
  });

  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    const messages = error.details.map((detail) => detail.message).join('; ');
    return new ValidationError(`Stage B2 validation failed: ${messages}`);
  }

  return null;
};

module.exports = {
  validateStageA,
  validateStageB1,
  validateStageB2,
};