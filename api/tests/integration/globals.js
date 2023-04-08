const { createClient } = require('../setup.js');

let client;

async function start() {
  client = await createClient();
}

start();

/**
 * Essa função cria um usuário na blockchain chamadno a rota padrão de criação.
 * Usar para fazer testes.
 * @param {Object} dados 
 * @returns {Promise}
 */
const cadastrarUsuarioBlockchain = async (dados) => {
  return await client.post('/blockchain/salvar/usuario').send(dados);
};

/**
 * Essa função pega dados e os salvam em um mongodb como dados temporários para que depois
 * possam ser inseridos no blockchain. Usar somente para testes.
 * @param {*} dados 
 * @returns {Promise}
 */
const cadastrarUsuarioNoBancoTemporario = async (dados) => {
  return await client.post('/usuarios').send(dados);
};

module.exports = {
  cadastrarUsuarioBlockchain,
  cadastrarUsuarioNoBancoTemporario,
};