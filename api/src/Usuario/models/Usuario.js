const { default: mongoose } = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  username: { type: String, lowercase: true },
  email: { type: String, lowercase: true },
  password: String,
  nome: String,
  sobrenome: String,
  rg: {
    type: String,
    default: null,
  },
  cpf: {
    type: String,
    default: null,
  },
  telefone: {
    type: String,
    default: null,
  },
  endereco: {
    type: String,
    default: null,
  }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
