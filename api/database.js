require("dotenv").config();
const mongoose = require('mongoose');

class Conexao {
  constructor() {
    const url = process.env.MONGO_DB_URL;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose.Promise = global.Promise;

    this.connect(url, options)
      .then(() => {
        console.info('✔ Database Connected');
      })
      .catch(error => {
        console.error('✘ MONGODB ERROR: ', error.message);
      });
  }

  async connect(url, options) {
    try {
      await mongoose.connect(url, options);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new Conexao();
