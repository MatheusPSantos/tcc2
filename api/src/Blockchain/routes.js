const express = require("express");
const { createValidator } = require("express-joi-validation");
const router = express.Router();

const { create, login } = require('./validator');
const BlockchainController = require('./controllers/usuario');
const AuthController = require('./controllers/auth');


router.post(
  "/blockchain/login/usuario",
  createValidator().body(login.body),
  AuthController.login
);

router.post(
  "/blockchain/logout/usuario",
  //createValidator().body(create.body),
  //BlockchainController.salvarUsuarioNaBlockchain
);

/**
 * Essa rota é responsável por salvar os dados de um usuário na blockchain através das 
 * chamadas do contrato.
 */
router.post(
  "/blockchain/salvar/usuario",
  createValidator().body(create.body),
  BlockchainController.salvarUsuarioNaBlockchain
);

router.post(
  "/blockchain/salvar/denuncia",
  //createValidator().body(create.body),
  //BlockchainController.salvarUsuarioNaBlockchain
);



module.exports = router;