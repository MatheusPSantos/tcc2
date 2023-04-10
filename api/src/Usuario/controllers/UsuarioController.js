const { HttpStatusCode } = require("axios");

const { checarSenhasIguais, criptografarSenha } = require("../services/SenhaService");
const logger = require('../../../logger');
const cache = require('memory-cache');
const { Web3HttpProvider, getAssinante, getNetwork
  , construirContratoInteligente } = require("../../providers/blockchain");
const { verificaSeUsuarioExiste } = require("../services/UsuarioService");
const network = getNetwork();
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
    const contratoInteligente = construirContratoInteligente(
      USUARIO_ABI,
      process.env.USUARIO_CONTRACT_ADDRESS
    );
    logger.info('Verificando se existe cadastro para email informado.');
    const usuarioExiste = await verificaSeUsuarioExiste(contratoInteligente, usuario.email);
    if (usuarioExiste) {
      return res.status(HttpStatusCode.Conflict).json({ error: 'Esse e-mail já possui um usuário já está cadastrado.' });
    }

    logger.info('Iniciando cadastro de usuário na blockchain...');
    usuario.password = await criptografarSenha(usuario.password);
    usuario.email = usuario.email.toLowerCase();

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
  } catch (error) {
    logger.error(error);
    res.status(HttpStatusCode.InternalServerError).json({ error: error.message });
  }
}

module.exports = {
  store,
};
