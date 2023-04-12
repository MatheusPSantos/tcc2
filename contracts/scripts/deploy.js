const { ethers, config } = require("hardhat");

async function main() {
  const Usuario = await ethers.getContractFactory('Usuario');
  const Denuncia = await ethers.getContractFactory('Denuncia');
  const FileStorage = await ethers.getContractFactory('FileStorage');
  const usuario = await Usuario.deploy();
  const denuncia = await Denuncia.deploy();
  const fileStorage = await FileStorage.deploy();

  const accounts = config.networks.hardhat.accounts;
  await usuario.deployed();
  await denuncia.deployed();
  await fileStorage.deployed();
  // Endereço do contrato na blockchain
  console.log('Contrato Usuario deployed em ', usuario.address);
  console.log('Contrato Denuncia deployed em ', denuncia.address);
  console.log('Contrato FileStorage deployed em ', fileStorage.address);
  console.log('Chaves privadas ', accounts);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
