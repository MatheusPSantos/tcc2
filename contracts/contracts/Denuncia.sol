// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * Contrato que salva, lista e gerencia as denúncias realizadas pelos usuários
 * finais da aplicação.
 * @title Contrato de Denúncias
 * @author matheuspsantos
 */
contract Denuncia {
    /**
     * Essa é a estrutura de que define uma Denúncia salva dentro da blockchain.
     * Ela funciona similarmente a definição de um objeto para o nosso caso.
     */
    struct InstanciaDenunca {
        uint ID;
        string titulo;
        string descricao;
        string anexosJSONString; // Guardar os IDS ou endereços dos Arquivos em um Array Stringified.
        string autor; // o autor é necessariamente o e-mail do autor. Servirá como
        string enderecoJSONString;
        bool status;
        string data;
        string dataSolucao; // data da solução da denúncia.
    }

    uint contadorDenuncia; // contador que servirá como identificador de cada denúncia.

    mapping(uint => InstanciaDenunca) public denuncias;

    /**
     * Função responsável por salvar uma InstanciaDenuncia.
     * @param _titulo É o título da denúncia.
     * @param _descricao É a descrição da denúncia, onde o usuário da as informações a respeito do caso.
     * @param _anexosJSONString Guardar os IDS ou endereços dos Arquivos em um Array Stringified.
     * @param _autor Autor é necessariamente o e-mail do autor.
     * @param _enderecoJSONString Deverá ser um JSON strinfied contendo o endereço do local em que ocorreu o crime denunciado.
     * @param _data Data da criação da denúncia.
     */
    function criarDenuncia(
        string memory _titulo,
        string memory _descricao,
        string memory _anexosJSONString, // Guardar os IDS ou endereços dos Arquivos em um Array Stringified.
        string memory _autor, // o autor é necessariamente o e-mail do autor. Servirá como
        string memory _enderecoJSONString,
        string memory _data
    ) public returns (InstanciaDenunca memory) {
        // interando o contador para identificar a denúncia.
        contadorDenuncia++;
        // instanciando uma InstanciaDenuncia
        denuncias[contadorDenuncia] = InstanciaDenunca(
            contadorDenuncia,
            _titulo,
            _descricao,
            _anexosJSONString,
            _autor,
            _enderecoJSONString,
            false, // denuncia é criad com status de não resolvida
            _data,
            ''
        );

        return denuncias[contadorDenuncia];
    }

    /**
     * Função responsável por listar todas as InstanciasDenuncia que estão atreladas
     * a um determinado autor (email).
     */
    function listarDenuncias(string memory _email) public view {}

    /**
     * Função responsável por listar UMA única instânciaDenuncia atrelada a um ID
     * e também faz a validação com o email.
     */
    function listarDenuncia(uint _ID, string memory _email) public view {}
}
