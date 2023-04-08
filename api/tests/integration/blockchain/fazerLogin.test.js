const { faker } = require('@faker-js/faker');
const { HttpStatusCode } = require('axios');
const { createClient } = require('../../setup');
const { cadastrarUsuarioBlockchain, cadastrarUsuarioNoBancoTemporario } = require('../globals');

faker.setLocale("pt_BR");
describe('Fazer login.', () => {
  let client;
  let usuarioNoBDTemporario;

  const enderecoMock = {
    pais: faker.address.country(),
    estado: faker.address.state(),
    cidade: faker.address.city(),
    logradouro: faker.address.street(),
    referencia: faker.address.buildingNumber(),
    cep: faker.address.zipCode(),
    coordenadas: {
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude()
    }
  };

  const dadosUsuarioMock = {
    nome: "Júlio",
    sobrenome: "Pereira",
    email: "Carla.Braga29@gmail.com",
    username: "CarlaBraga29",
    rg: "12345-6",
    cpf: "123.456.789-10",
    telefone: "(57) 6756-6692",
    password: "12345",
    repeat_password: "12345",
    endereco: JSON.stringify(enderecoMock)
  };

  const dadosLogin = {
    email: dadosUsuarioMock.email,
    password: dadosUsuarioMock.password
  };

  beforeAll(async () => {
    client = await createClient();
    let dados = dadosUsuarioMock;
    delete dados.endereco;
    usuarioNoBDTemporario = await cadastrarUsuarioNoBancoTemporario(dados);
  });

  it('Deve retornar mensagem se usuário não existe na Blockchain.', async () => {
    const response = await client.post('/blockchain/login/usuario')
      .send(dadosLogin);

    expect(response).toHaveProperty('status', 404);
    expect(response).toHaveProperty('text', 'Usuário não existe.');
  });

  it('Deve retornar mensagem de erro para login não válido', async () => {
    const res = await client.post('/blockchain/login/usuario/')
      .send({ email: 'loginInvalido@email.com', password: '1111' });

    expect(res.status).toBe(HttpStatusCode.NotFound);
  });

  it('Deve retornar um erro de email inválido se informar formato de email errado', async () => {
    const res = await client.post('/blockchain/login/usuario')
      .send({ email: 'naovalido', password: '12434' });
    expect(res.status).toBe(HttpStatusCode.BadRequest);
  });

  it('Deve retornar um token se usuário existe na Blockchain.', async () => {
    const res = await cadastrarUsuarioBlockchain(dadosUsuarioMock);
    const { email, password } = res.body.dadosUsuarioTemporario;

    const chamadaDeLogin = await client.post('/blockchain/login/usuario')
      .send({ email: email, password: password });
    
    expect(chamadaDeLogin.status).toBe(200);
    expect(chamadaDeLogin.body).toHaveProperty('token');
    expect(chamadaDeLogin.body).toHaveProperty('estaLogado');
  });
});