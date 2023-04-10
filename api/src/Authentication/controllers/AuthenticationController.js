const { HttpStatusCode } = require("axios");
const cache = require("memory-cache");
const logger = require("../../../logger");
const { construirContratoInteligente } = require("../../providers/blockchain");
const { verificaSeUsuarioExiste } = require("../../Usuario/services/UsuarioService");
const { criptografarSenha } = require('../../Usuario/services/SenhaService');
/**
 * Função que realiza login a partir de uma requisição com email e senha do usuário.
 * @param {Object} req Request do express
 * @param {Object} res Objeto Response do express
 */
async function fazerLogin(req, res) {
  try {
    logger.info('Iniciando requisição de login.');
    const { email, password } = req.body;
    const USUARIO_ABI = cache.get('USUARIO_ABI');
    const contratoInteligente = construirContratoInteligente(
      USUARIO_ABI, process.env.USUARIO_CONTRACT_ADDRESS
    );

    if (await verificaSeUsuarioExiste(contratoInteligente, email)) {
      const senhaCriptografada = await criptografarSenha(password);
      const emailTratado = email.toLowerCase().trim();
      console.log(emailTratado, '\n', senhaCriptografada);
      const usuarioExistente = await contratoInteligente
        .methods
        .fazerLogin(emailTratado, senhaCriptografada)
        .call();
      res.status(HttpStatusCode.Ok).json({ ...usuarioExistente });
    }
    return res.status(HttpStatusCode.BadRequest).json({ error: 'Usuário não cadastrado.' });

  } catch (error) {
    logger.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ error: error.message });
  }
}

module.exports = {
  fazerLogin,
}