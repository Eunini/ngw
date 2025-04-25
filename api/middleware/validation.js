const Joi = require('joi');
const logger = require('../utils/logger');
const AppError = require('../utils/appError');

const validateRequest = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');

      logger.error(`Validation error: ${message}`);
      next(new AppError(message, 422));
    }
  };
};

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid(
    'admin',
    'hydrogeologist',
    'engineer',
    'driller',
    'contractor',
    'drilling_company'
  ).required(),
  // [Include other validation schemas from previous response]
});

exports.validateRegister = validateRequest(registerSchema);
// [Export other validation middlewares as needed]