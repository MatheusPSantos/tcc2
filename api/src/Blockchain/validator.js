const Joi = require("joi");

module.exports = {
  create: {
    body: Joi.object({
      email: Joi.string().email().required(),
      username: Joi.string().min(3).required(),
      nome: Joi.string(),
      sobrenome: Joi.string(),
      rg: Joi.string(),
      cpf: Joi.string(),
      telefone: Joi.string(),
      password: Joi.string().min(3).required(),
      repeat_password: Joi.string().min(3).required(),
      endereco: Joi.string(),
    })
  },
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(3),
    })
  }
};