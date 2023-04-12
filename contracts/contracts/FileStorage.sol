// // SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

/**
 * @title Arquivos
 * @author matheuspsantos
 */
contract FileStorage {
    /**
     * Definindo a estrutura do arquivo
     */
    struct File {
        uint256 id;
        string emailUsuario; // email do denunciante
        string base64Arquivo; // base64 do arquivo em si.
        string fileType;
        string fileName;
        string data; // data de upload
    }
    // serve como identificação do arquivo.
    uint256 public fileCount = 0;
    mapping(uint256 => File) public arquivos;

    /**
    * Salva um arquivo na blockchain.
     */
    function upload(
        string memory _emailUsuario,
        string memory _base64,
        string memory _fileType,
        string memory _fileName,
        string memory _data
    ) public returns (File memory) {
        fileCount++; // incrementa o contador de arquivos;
        arquivos[fileCount] = File(
            fileCount,
            _emailUsuario,
            _base64,
            _fileType,
            _fileName,
            _data
        );

        return arquivos[fileCount];
    }
}
