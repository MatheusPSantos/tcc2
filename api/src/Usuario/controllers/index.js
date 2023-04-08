const { HttpStatusCode } = require("axios");

const { NotificarErroAoSlack } = require("../../exceptions");
const UsuarioService = require("../services");
const { checarSenhasIguais } = require("../services/senha");


/**
 * Responsável pela criação do usuaário.
 * @param {express.Response} req 
 * @param {express.Request} res
 */
async function criarUsuario(req, res) {
  try {
    const {
      username,
      email,
      password,
      repeat_password,
      nome,
      sobrenome,
      rg,
      cpf,
      telefone
    } = req.body;

    if (!checarSenhasIguais(password, repeat_password)) {
      res.status(HttpStatusCode.Unauthorized).json({
        erro: "As senha e a repetição dela devem ser iguais"
      });
    }

    const novoUsuario = await UsuarioService.criarUsuario({
      username,
      email,
      password,
      nome,
      sobrenome,
      rg,
      cpf,
      telefone
    });

    res.status(HttpStatusCode.Created).json(novoUsuario.toObject());
  } catch (error) {
    NotificarErroAoSlack('Usuario/controllers/usuario.js', error);
    res.status(HttpStatusCode.InternalServerError).json({ error: error.message });
  }
}

async function excluir(req, res) {
  try {
    const { email } = req.params;

    const usuarioExcluido = await UsuarioService.excluirUsuario({ email });

    res.status(HttpStatusCode.Accepted).json(usuarioExcluido);

  } catch (error) {
    NotificarErroAoSlack('Usuario/controllers/usuario.js', error);
    res.status(HttpStatusCode.InternalServerError).json({ error: error.message });
  }
}

module.exports = {
  criarUsuario,
  excluir,
};
