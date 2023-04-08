const express = require("express");
const { createValidator } = require("express-joi-validation");
const router = express.Router();
const { create  } = require("./validator");

const EnderecoController = require('./controllers/index');

router.patch(
  "/enderecos",
  createValidator().body(create.body),
  EnderecoController.adicionarEndereco
);

module.exports = router;