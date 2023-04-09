const express = require("express");
const { createValidator } = require("express-joi-validation");
const UsuarioController = require("./controllers/UsuarioController");
const router = express.Router();
const { create, excluir } = require("./validator");

/**
 * Rota responsável por salvar as informações do usuário na Blockchain.
 */
router.post(
  "/usuarios",
  createValidator().body(create.body),
  UsuarioController.store,
);

router.delete(
  '/usuarios/:email',
  createValidator().params(excluir.params),
  UsuarioController.excluir
);


module.exports = router;