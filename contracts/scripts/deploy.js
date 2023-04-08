const { ethers, config } = require("hardhat");

async function main() {
  const Usuario = await ethers.getContractFactory('Usuario');
  const usuario = await Usuario.deploy();

  const accounts = config.networks.hardhat.accounts;
  await usuario.deployed();
  // Endereço do contrato na blockchain
  console.log('Contrato Usuario deployed em ', usuario.address);
  console.log('Chaves privadas ', accounts);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
