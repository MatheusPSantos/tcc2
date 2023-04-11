const { HttpStatusCode } = require("axios");
const cache = require("memory-cache");
const logger = require("../../../logger");
const { construirContratoInteligente } = require("../../providers/blockchain");
const { verificaSeUsuarioExiste } = require("../../Usuario/services/UsuarioService");
const { criptografarSenha, compararSenhas } = require('../../Usuario/services/SenhaService');
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

    logger.info('Verificando se o usuário existe...');
    if (await verificaSeUsuarioExiste(contratoInteligente, email)) {
      const emailTratado = email.toLowerCase().trim();
      const usuarioExistente = await contratoInteligente
        .methods
        .fazerLogin(emailTratado)
        .call();

      logger.info('Usuario recuperado com sucesso. Validando a senha...');
      if (await compararSenhas(password, usuarioExistente.password)) {
        logger.info('Retornando dados...');
        return res.status(HttpStatusCode.Ok).json({
          username: usuarioExistente.username,
          email: usuarioExistente.email,
          nome: usuarioExistente.nome,
          sobrenome: usuarioExistente.sobrenome,
          rg: usuarioExistente.rg,
          cpf: usuarioExistente.cpf,
          telefone: usuarioExistente.telefone,
          enderecoJSONString: usuarioExistente.enderecoJSONString,
        });
      } else {
        logger.info('Senha não confere com a senha do usuário.');
        return res.status(HttpStatusCode.Unauthorized).send();
      }
    }

    logger.info('Usuário não está cadastrado');
    return res.status(HttpStatusCode.BadRequest).json({ error: 'Usuário não cadastrado.' });
  } catch (error) {
    logger.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ error: error.message });
  }
}

module.exports = {
  fazerLogin,
}