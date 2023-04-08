// // SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

// /**
//  * @title Definindo o contrato
//  * @author matheuspsantos
//  */
// contract FileStorage {
//     uint256 public userId; // precisa vir da api convertido hash -> number
//     uint256 public fileCount = 0;

//     constructor(uint256 _userId) {
//         userId = _userId;
//     }

//     mapping(uint256 => File[]) private files;

//     /**
//      * Definindo a estrutura do arquivo
//      */
//     struct File {
//         uint256 id;
//         uint256 ownerId; // id do denunciante
//         string filePath;
//         uint256 fileSize;
//         string fileType;
//         string fileName;
//         address payable uploader;
//     }

//     /**
//      * Defininfo evento
//      */
//     event FileUploaded(
//         uint256 id,
//         uint256 ownerId,
//         string filePath,
//         uint256 fileSize,
//         string fileType,
//         string fileName,
//         address payable uploader
//     );

//     /**
//      * realiza o upload do arquivo
//      */
//     function upload(
//         string memory _filePath,
//         uint256 _fileSize,
//         string memory _fileType,
//         string memory _fileName
//     ) public {
//         // nesse ponto a validacao que path, filesize > 0, tipo, name deve ter sido feita na API
//         require(msg.sender != address(0), "validation sender failled");
//         fileCount++; // incrementa o contador de arquivos;
//         files[fileCount].push(
//             File(
//                 fileCount,
//                 userId,
//                 _filePath,
//                 _fileSize,
//                 _fileType,
//                 _fileName,
//                 payable(msg.sender)
//             )
//         );

//         // emitir evento de que o arquivo foi adicionado
//         emit FileUploaded(
//             fileCount,
//             userId,
//             _filePath,
//             _fileSize,
//             _fileType,
//             _fileName,
//             payable(msg.sender)
//         );
//     }
// }
