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
    }

    /**
     * Função responsável por salvar uma InstanciaDenuncia.
     */
    function criarDenuncia() public {}

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
