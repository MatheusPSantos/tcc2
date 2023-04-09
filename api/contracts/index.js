require('dotenv').config();
const { default: axios } = require("axios");
const logger = require('../logger');

/**
 * Cache para pegar o ABIs dos contratos em toda a aplicação.
 */
const cache = require('memory-cache');

/**
 * O intuito dessa função é pegar os ABIs para todos os contratos que podemos utilizar
 * e armazená-los em variáveis globais aqui definidas e que podem ser acessadas por todo o projeto.
 * Isso serve para evitar que a cada requisição nas rotas seja feita uma consulta na blockchain,
 * o que pode causar lentidão, tendo em vista também que o ABI é uma informação que não deve ser alterada
 * com muita frequência.
 */
async function pegarTodosABIs() {
  try {
    logger.info('Pegando os ABIs de todos os contratos utilizados...');
    logger.info('ABI para contrato de usuário...');
    usuarioABI = await getContratoABI('Usuario')
      .then(res => {
        logger.info('ABI para contrato do usuário pronta.');
        return res.abi;
      })
      .catch(err => logger.error('Erro ao pegar ABI do usuario: ', err));
    logger.info('Guardando ABIs no cache...');
    cache.put('USUARIO_ABI', usuarioABI);
    logger.info('ABIs armazenados em cache.');
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

/**
 * Realiza a consulta por um contrato e retorna o ABI do mesmo. Se conecta com um
 * serviço implementado dentro do projeto de contratos e que ler arquivos diretamente.
 * @param {string} nomeContrato Nome do contrato que será buscado na Blockchain
 * @returns {Object} O Objeto contenfo o json ABI.
 */
async function getContratoABI(nomeContrato) {
  const options = { method: 'GET', url: `${process.env.BLOCKCHAIN_FUNCTIONS_URL}/abi/${nomeContrato}` };
  return axios.request(options).then(function (response) {
    return response.data;
  }).catch(function (error) {
    logger.error(error);
    throw new Error(error);
  });
}

module.exports = {
  pegarTodosABIs,
};