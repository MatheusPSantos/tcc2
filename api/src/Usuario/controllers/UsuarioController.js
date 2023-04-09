const { HttpStatusCode } = require("axios");

const { checarSenhasIguais, criptografarSenha } = require("../services/senha");
const logger = require('../../../logger');
const cache = require('memory-cache');
const { Web3HttpProvider, getAssinante } = require("../../providers/blockchain");
const network = process.env.EHTHEREUM_NETWORK;
const web3 = Web3HttpProvider();
const assinante = getAssinante(web3);

/**
 * Salva o usuário na Blockchain.
 * @param {express.request} req 
 * @param {express.response} res
 * @returns {Promise<Object>} 
 */
async function store(req, res) {
  try {
    let usuario = req.body;
    const USUARIO_ABI = cache.get('USUARIO_ABI');
    if (USUARIO_ABI && Array.isArray(USUARIO_ABI)) {
      logger.info('ABI de usuário acessível.');
      web3.eth.accounts.wallet.add(assinante);
      const contratoInteligente = new web3.eth.Contract(USUARIO_ABI, process.env.USUARIO_CONTRACT_ADDRESS);
      logger.info('Verificando se existe cadastro para email informado.');
      const usuarioExiste = await contratoInteligente.methods.verificarUsuarioExiste(usuario.email).call();

      if (usuarioExiste) {
        return res.status(HttpStatusCode.Conflict).json({ error: 'Esse e-mail já possui um usuário já está cadastrado.' });
      }

      logger.info('Iniciando cadastro de usuário na blockchain...');
      usuario.password = criptografarSenha(usuario.password);
      const transaction = await contratoInteligente.methods.registrarUsuario(
        usuario.username,
        usuario.email,
        usuario.nome,
        usuario.sobrenome || '',
        usuario.rg || '',
        usuario.cpf,
        usuario.telefone || '',
        usuario.endereco || '{}',
        usuario.password
      );

      if (!transaction) {
        return res.status(HttpStatusCode.FailedDependency)
          .send('Falha ao criar a transação.');
      }

      const estimatedGas = await transaction.estimateGas();

      if (!estimatedGas) {
        return res.status(HttpStatusCode.FailedDependency)
          .send('Falha ao tentar estimar o GAS.');
      }

      const receipt = await transaction
        .send({ from: assinante.address, gas: estimatedGas })
        .once('transactionHash', txHash => {
          logger.info('minerando transação ...');
          logger.info(`https://${network}.etherscan.io/tx/${txHash}`);
        });

      logger.info(`Bloco minerado: ${receipt.blockNumber}`);
      res.status(HttpStatusCode.Created).json({
        message: 'Transação bem-sucedida.',
        blockNumber: receipt.blockNumber,
      });
    } else {
      return res.status(HttpStatusCode.BadRequest).json({ error: 'ABI do smart contract não disponível.' });
    }
  } catch (error) {
    logger.error(error);
    res.status(HttpStatusCode.InternalServerError).json({ error: error.message });
  }
}

/**
 * Responsável por retornar as informações de um usuário.
* @param {Object} req
* @param {Object} res
 */
async function show(req, res) {
  try {
    // verificar se existe usuario com esse email

    // se sim: retorna os dados, exceto senha

    // se não: retorna erro
  } catch (error) {
    logger.error(error);
    res.status(HttpStatusCode.InternalServerError).json({ error: error.message });
  }
}

module.exports = {
  store,
  show,
};
