const express = require("express");
const router = express.Router();

const usuarioRoutes = require("./Usuario/routes");
const enderecoRoutes = require('./Endereco/routes');
const blockchainRoutes = require('./Blockchain/routes');
const authRoutes = require("./Authentication/routes");

router.use(usuarioRoutes);
router.use(authRoutes);
// router.use(enderecoRoutes);
// router.use(blockchainRoutes);

module.exports = router;