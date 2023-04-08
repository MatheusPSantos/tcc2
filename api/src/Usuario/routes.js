const express = require("express");
const { createValidator } = require("express-joi-validation");
const UsuarioController = require("./controllers");
const router = express.Router();
const { create, excluir } = require("./validator");

router.post(
  "/usuarios",
  createValidator().body(create.body),
  UsuarioController.criarUsuario,
);

router.delete(
  '/usuarios/:email',
  createValidator().params(excluir.params),
  UsuarioController.excluir
);


module.exports = router;