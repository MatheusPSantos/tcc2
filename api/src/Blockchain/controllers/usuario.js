require('dotenv').config();

const { HttpStatusCode } = require('axios');
const { ABI } = require('../../../contracts');
const { NotificarErroAoSlack } = require('../../exceptions');
const { Web3HttpProvider, getAssinante } = require('../../providers/blockchain');
const { excluirUsuario, consultarUsuario } = require('../../Usuario/services');
const network = process.env.EHTHEREUM_NETWORK;
const web3 = Web3HttpProvider();
const assinante = getAssinante(web3);

/**
 * Função que salva um usuário na Blockchain a parti dos dados
 * que já estão prés-salvos no Banco de dados intermediário.
 * @param {express.request} req 
 * @param {express.response} res 
 * @returns {Promise<Object>}
 */
async function salvarUsuarioNaBlockchain(req, res) {
  try {
    const { username, email } = req.body;
    const usuario = await consultarUsuario(email, username);
    if (usuario) {
      // salvar o usuario no BC
      const usuarioContractAbi = await ABI.getContratoABI('Usuario')
        .then(res => res.abi);
      if (usuarioContractAbi && Array.isArray(usuarioContractAbi)) {
        web3.eth.accounts.wallet.add(assinante);
        const contratoInteligente = new web3.eth.Contract(usuarioContractAbi, process.env.USUARIO_CONTRACT_ADDRESS);
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
            console.info('Mineirando transação ...');
            console.info(`https://${network}.etherscan.io/tx/${txHash}`);
          });
        console.info(`Bloco mineirado: ${receipt.blockNumber}`);
        const usuarioExcluido = await excluirUsuario(usuario).then(res => res.toJSON()); // excluir o usuario
        res.status(HttpStatusCode.Created).json({
          message: 'Transação bem-sucedida.',
          blockNumber: receipt.blockNumber,
          dadosUsuarioTemporario: { ...usuarioExcluido },
        });
      } else {
        res.status(HttpStatusCode.BadRequest).json({ error: 'Smart contract não possui ABI associado.' });
      }
    } else {
      res.status(HttpStatusCode.NotFound).json({ error: 'Usuário não está pré-cadastrado.' });
    }
  } catch (error) {
    NotificarErroAoSlack('salvarUsuarioNaBlockchain', error);
    res.status(HttpStatusCode.InternalServerError).json({ error: error.message });
  }
}

module.exports = {
  salvarUsuarioNaBlockchain,
};


