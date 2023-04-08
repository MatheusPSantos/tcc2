/**
 * Service para gerenciamento do CRUD do usuário.
 */
const { criptografarSenha } = require('./senha');
const Usuario = require('../models/Usuario');

async function criarUsuario({ username, email, password, nome, sobrenome, rg, cpf, telefone }) {
  const jaExiste = await Usuario.findOne({ email, username }).lean();

  if (jaExiste) {
    throw new Error("Este email ou username já está sendo utilizado.");
  }

  // criptografar a senha
  const senhaCriptografada = await criptografarSenha(password);
  const novoUsuario = new Usuario({
    username,
    email,
    password: senhaCriptografada,
    nome,
    sobrenome,
    rg,
    cpf,
    telefone
  });

  novoUsuario.save(async (err) => {
    if (err) {
      throw new Error(err);
    }
  });
  return novoUsuario;
}

async function excluirUsuario({ email }) {
  return await Usuario.findOneAndDelete({ email: email });
}

async function consultarUsuario(email, username) {
  try {
    return await Usuario.findOne({ email, username }).lean();
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  criarUsuario,
  excluirUsuario,
  consultarUsuario,
}