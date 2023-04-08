const Joi = require('joi');

module.exports = {
  create: {
    body: Joi.object({
      pais: Joi.string().required(),
      estado: Joi.string().required(),
      cidade: Joi.string().required(),
      logradouro: Joi.string(),
      referencia: Joi.string(),
      cep: Joi.string().required(),
      coordenadas: Joi.object({
        latitude: Joi.number(),
        longitude: Joi.number(),
      }),
      email: Joi.string().email().required(),
    }),
  },
};
