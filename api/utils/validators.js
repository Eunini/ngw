const Joi = require('joi');
const { ROLES } = require('../config/constants');

exports.registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid(...Object.values(ROLES)).required(),
  specialization: Joi.when('role', {
    is: Joi.valid(ROLES.HYDROGEOLOGIST, ROLES.ENGINEER, ROLES.DRILLER),
    then: Joi.string().required(),
    otherwise: Joi.string().optional()
  }),
  licenseType: Joi.when('role', {
    is: Joi.valid(ROLES.HYDROGEOLOGIST, ROLES.ENGINEER, ROLES.DRILLER),
    then: Joi.string().required(),
    otherwise: Joi.string().optional()
  }),
  licenseNumber: Joi.when('role', {
    is: Joi.valid(ROLES.HYDROGEOLOGIST, ROLES.ENGINEER, ROLES.DRILLER),
    then: Joi.string().required(),
    otherwise: Joi.string().optional()
  }),
  state: Joi.string().required()
});

// [Include other validation schemas as needed]