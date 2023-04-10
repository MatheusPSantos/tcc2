const bcrypt = require('bcrypt');

module.exports = {
  criptografarSenha: async (senha) => {
    const saltRounds = 10;
    return bcrypt.hashSync(senha, saltRounds);
  },

  checarSenhasIguais: (senha, senhaRepetida) => {
    return senha === senhaRepetida;
  },
};