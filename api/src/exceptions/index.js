require('dotenv').config();
const axios = require('axios');

module.exports = {
  NotificarErroAoSlack: async (arquivo, erro) => {
    if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      return console.log(arquivo, erro);
    }
    new Error(erro);
    try {
      const alert_url = `https://hooks.slack.com/services/${process.env.SLACK_TOKEN}`;
      axios({
        method: 'post',
        url: alert_url,
        data: { 
          text: `*🚨 Grave:* _(${arquivo})_: ${erro.stack}`,
          'username': 'tcc2',
          'icon_emoji': ':robot_face:'
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
};