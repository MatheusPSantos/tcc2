const express = require("express");
const { createValidator } = require("express-joi-validation");
const AuthenticationController = require('./controllers/AuthenticationController');
const router = express.Router();
const validator = require('./validator');

/**
 * Rota que faz o login do usuário.
 * Retornar códigos de erro caso haja algo de errado com login.
 * Retorna as infos básicas do usuário caso login seja feito com sucesso.
 * Cria um TOKEN que é guardado no contrato TOKEN.
 */
router.post(
  "/login",
  createValidator().body(validator.auth.body),
  AuthenticationController.fazerLogin,
);

module.exports = router;