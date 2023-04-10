// require('../../exceptions/index');

// const { HttpStatusCode } = require('axios');
// const { NotificarErroAoSlack } = require('../../exceptions/index');
// const Usuario = require('../../Usuario/models/Usuario');

// async function adicionarEndereco(req, res) {
//   try {
//     const {
//       email,
//       pais,
//       estado,
//       cidade,
//       logradouro,
//       referencia,
//       cep,
//       coordenadas
//     } = req.body;

//     const usuario = await Usuario.findOne({ email }).lean();

//     if (!usuario) res.status(404).json({
//       error: 'O email informado não possui um usuário associado'
//     });

//     const endereco = JSON.stringify({
//       pais, estado, estado, cidade, logradouro, referencia, cep, coordenadas
//     });

//     const usuarioComEndereco = await Usuario.updateOne({ email }, { endereco: endereco });

//     res.status(HttpStatusCode.Ok).json(usuarioComEndereco);
//   } catch (error) {
//     NotificarErroAoSlack('Endereco/controllers/index.js', error);
//     res.status(HttpStatusCode.InternalServerError).json(error.message);
//   }
// }

// module.exports = {
//   adicionarEndereco,
// };