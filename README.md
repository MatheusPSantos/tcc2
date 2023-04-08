# Projeto: Implementação

## Introdução

## Arquitetura

## Tecnologias

### Hardhat
Hardhat é uma ferramenta de desenvolvimento que possui como finalidade prover um ambiente de desenvolvimento e compilacao, deploy, teste e debug para um Smart contracts.



### Como rodar o projeto?
#### Contracts
Por padrão, por estar utilizando o HardHat, estamos utilizando a Hardhat Network. Ela é simplesmente uma rede local.

- Entrar na pasta contracts;
- Rodar o seguinte comando:
  - `npx hardhat node`
  - Esse comando irá iniciar uma rede Hardhat e expô-la como JSON-RPC e também um servidor websocket.
  - Depois é necessário fazer o deploy do contrato, para localhost o comando é `npx hardhat run scripts/NOME.js --network localhost`.
  - Irá aparecer um endereco hexadecimal de onde o contrato foi deployado.

## To dos:
- configurar o hardhat.config.js para utilizar a rede de testes;
- 

## Contribuição
