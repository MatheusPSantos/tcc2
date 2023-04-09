require("dotenv").config();
const app = require("express")();
const routes = require("./src/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./logger");
const { pegarTodosABIs } = require("./contracts");

app.use(bodyParser.json());
app.use(cors());

app.use(routes);

logger.info('✔ Starting Application');
logger.info(`✔ Mode: ${process.env.NODE_ENV}`);
logger.info(`✔ Port: ${process.env.PORT}`);

app.listen(process.env.PORT || 3333, async () => {
  logger.info(':: Contracts :: ');
  logger.info('Carregando os ABIs em cache...');
  await pegarTodosABIs();

  logger.info(`API running on port http://127.0.0.1:${process.env.PORT || 3333}`);
});

module.exports = app;