const request = require('supertest');
const app = require('../index');

async function createClient() {
  return await request(app);
}

module.exports = { createClient };
