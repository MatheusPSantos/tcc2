require('dotenv').config();
const Web3 = require('web3');

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

module.exports = {
  Web3HttpProvider,
  getAssinante,
};