require('dotenv').config();
const Web3 = require('web3');
const logger = require('../../logger');

function Web3HttpProvider() {
  return new Web3(new Web3.providers.HttpProvider(
    process.env.JSON_RPC_SERVER
  ));
}

function getAssinante(web3) {
  return web3.eth.accounts.privateKeyToAccount(
    process.env.CHAVE_PRIVADA_ASSINANTE
  );
}
/**
 * Pega o hash para conectar com a network da ETH
 * @returns {string} Hash da network da ETH
 */
function getNetwork() {
  return process.env.EHTHEREUM_NETWORK;
}

/**
 * Essa função constrói o contrato inteligente que poderá ser utlizado
 * no projeto para fazer as chamadas dentro do contrato.
 * @param {Array} ABI 
 * @param {string} CONTRATO_ADDRESS 
 * @returns Instância de contrato inteligente.
 */
function construirContratoInteligente(ABI, CONTRATO_ADDRESS) {
  try {
    if (ABI && Array.isArray(ABI)) {
      const web3 = Web3HttpProvider();
      const assinante = getAssinante(web3);
      web3.eth.accounts.wallet.add(assinante);
      logger.info('Retornado instância de contrato inteligente pronta para uso...');
      return new web3.eth.Contract(ABI, CONTRATO_ADDRESS);
    }
    throw new Error('ABI é inválido');
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

module.exports = {
  Web3HttpProvider,
  getAssinante,
  getNetwork,
  construirContratoInteligente,
};
