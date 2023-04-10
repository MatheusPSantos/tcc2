const Joi = require('joi');

module.exports = {
  auth: {
    body: Joi.object({
      email: Joi.string().email().min(3).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    }),
  },
};