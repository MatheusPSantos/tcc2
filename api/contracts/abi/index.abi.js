require('dotenv').config();
const { default: axios } = require("axios");
const { NotificarErroAoSlack } = require('../../src/exceptions');

async function getContratoABI(nomeContrato) {
  const options = { method: 'GET', url: `${process.env.BLOCKCHAIN_FUNCTIONS_URL}/abi/${nomeContrato}` };
  return axios.request(options).then(function (response) {
    return response.data;
  }).catch(function (error) {
    console.error(error);
    NotificarErroAoSlack('/api/contracts/abi/index.abi.js/getusuarioAbi', error);
    throw new Error(error);
  });
}

module.exports = {
  getContratoABI,
}