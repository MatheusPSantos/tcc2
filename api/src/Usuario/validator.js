const Joi = require('joi');

module.exports = {
  create: {
    body: Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().min(3).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      repeat_password: Joi.required(),
      nome: Joi.string().required().min(1),
      sobrenome: Joi.string().min(1),
      rg: Joi.string(),
      cpf: Joi.string().required(),
      telefone: Joi.string().required().pattern(new RegExp('(^[0-9]{2})?(\s|-)?(9?[0-9]{4})-?([0-9]{4}$)')),
    }),
  },
  excluir: {
    params: Joi.object({
      email: Joi.string().email().min(3).required(),
    }),
  },
};