const express = require('express');
const fs = require('fs');
const app = express();

/**
 * Validando a origem da requisição.
 */
app.use((req, res, next) => {
  try {
    const allowedOrigins = ['http://127.0.0.1:3333', 'http://example.com', 'https://example.com'];
    const origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    next();
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * Essa rota permite que o backend que não tem a implementação do contrato
 * possa pegar o ABI resultante do deploy do contrato.
 * @param {string} rota
 * @param {Function<express>} (req, res)
 * @returns {Object} Retorna o json contendo o ABI do contrato
 */
app.get('/abi/:contratoNome', (req, res) => {
  try {
    const { contratoNome } = req.params;
    console.info(`Consultando contrato ${contratoNome} ...`);

    if (!contratoNome) res.status(404).send({ error: 'Informe um nome de contrato para pesquisarmos o ABI.' });

    fs.readFile(
      `../artifacts/contracts/${contratoNome}.sol/${contratoNome}.json`,
      'utf8',
      (err, data) => {
        if (err) {
          res.status(500).send({ error: 'Error reading file' });
        } else {
          const jsonParseado = JSON.parse(data);
          const abi = jsonParseado.abi;
          res.json({ abi });
        }
      });
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

