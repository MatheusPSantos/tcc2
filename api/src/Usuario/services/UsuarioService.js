const logger = require("../../../logger");

/**
 * Função que verifica se o usuário está dentro da blockchain a partir do email.
 * Faz essa conexão utilizando um contrato inteligente.
 * @param {Object} contratoInteligente 
 * @param {string} email 
 * @returns {boolean}
 */
async function verificaSeUsuarioExiste(contratoInteligente, email) {
  try {
    if (contratoInteligente) {
      const usuarioExiste = await contratoInteligente.methods.verificarUsuarioExiste(email).call();
      if (usuarioExiste) {
        return true;
      }
      else {
        return false;
      }
    }
    throw new Error('Um contrato inteligente deve ser fornecido para que possa ser realizado a conexão com o Blockchain');
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

module.exports = {
  verificaSeUsuarioExiste,
};
