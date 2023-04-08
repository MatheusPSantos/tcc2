const { faker } = require("@faker-js/faker");

describe('Usuario', function () {
  faker.setLocale("pt_BR");

  function montarUsuario() {
    return {
      nome: faker.name.firstName(),
      sobrenome: faker.name.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      rg: "12345-6",
      cpf: "123.456.789-10",
      telefone: faker.phone.number(),
      endereco: JSON.stringify({
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
      })
    };
  }
  it("Deve salvar um usuário", async function () {
    console.log(montarUsuario());
  });
});