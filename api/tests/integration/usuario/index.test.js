const { faker } = require('@faker-js/faker');
const { HttpStatusCode } = require('axios');
const logger = require('../../../logger');
const { createClient } = require('../../setup');

let client;

describe('Integration > Usuário', () => {
  const dadosMock = {
    username: 'nomeusuairo',
    email: 'email@teste.com',
    password: 'senha123',
    repeat_password: 'senha123',
    nome: 'Teste',
    sobrenome: 'teste',
    rg: '12345-6',
    cpf: '123.456.789-10',
    telefone: '(11) 11111-1111',
  };
  const enderecoMock = {
    pais: faker.address.country(),
    estado: faker.address.state(),
    cidade: faker.address.city(),
    logradouro: faker.address.street(),
    referencia: faker.address.direction(),
    cep: faker.address.zipCode(),
    coordenadas: {
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
    },
    email: 'email@teste.com',
  };
  /**
   * Faz a chamada para a rota /usuarios atraves do client de teste.
   */
  const cadastrarUsuarioNoBancoIntermediario = async (dados) => {
    try {
      return await client.post('/usuarios').send(dados);
    } catch (error) {
      logger.error(error);
    }
  };

  beforeAll(async () => {
    client = await createClient();
  });
  /**
   * Não mudar a ordem dos testes.
   */
  it('Deve cadastrar um usuário com sucesso no Banco de dados temporário.', async () => {
    const res = await cadastrarUsuarioNoBancoIntermediario(dadosMock);

    expect(res.status).toBe(HttpStatusCode.Created);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('cpf', dadosMock.cpf);
    expect(res.body).toHaveProperty('email', dadosMock.email);
    expect(res.body).toHaveProperty('nome', dadosMock.nome);
    expect(res.body).toHaveProperty('username', dadosMock.username);
    expect(res.body).toHaveProperty('telefone', dadosMock.telefone);
    expect(res.body).toHaveProperty('rg', dadosMock.rg);
  });

  it('Deve lançar um erro ao tentar cadastrar um usuário com email ja cadastrado', async () => {
    const res = await cadastrarUsuarioNoBancoIntermediario(dadosMock);
    expect(res.status).toBe(500);
    expect(res.text).toEqual('{"error":"Este email ou username já está sendo utilizado."}');
  });

  it('Deve atualizar um usuário com o valor do enderço', async () => {
    const res = await client.patch('/enderecos').send(enderecoMock);
    expect(res.status).toBe(HttpStatusCode.Ok);
  });

  it('Deve excluir um usuário com sucesso', async () => {
    const res = await client.delete(`/usuarios/${dadosMock.email}`);
    expect(res.status).toBe(HttpStatusCode.Accepted);
    expect(res.body).toHaveProperty('email', dadosMock.email);
    expect(res.body).toHaveProperty('nome', dadosMock.nome);
    expect(res.body).toHaveProperty('cpf', dadosMock.cpf);
  });

});