import ValidacaoBase from "./ValidacaoBase";

export default function ValidarTelefone(valor) {
    const erroObrigatorio = ValidacaoBase(valor);
    
    if (erroObrigatorio) {
        return erroObrigatorio;
    }

    if (!validaTelefone(valor)) {
        return "Telefone inválido";
    }

    return null;
}

function validaTelefone(telefone) {
    const telefoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:9?\d{4}\-?\d{4})$/;

    // Remove caracteres não numéricos
    const telefoneSomenteNumeros = telefone.replace(/\D/g, '');

    // Valida formato com regex e impede números repetidos ou sequenciais
    return telefoneRegex.test(telefone) &&
        !verificarDigitosRepetidos(telefoneSomenteNumeros) &&
        !verificarSequenciaNumerica(telefoneSomenteNumeros);


    // Função para verificar se o número tem todos os dígitos iguais
    function verificarDigitosRepetidos(telefone) {
        return /^(\d)\1+$/.test(telefone);
    }

    // Função para verificar sequências numéricas
    function verificarSequenciaNumerica(telefone) {
        const sequencias = [
            '0123456789', '1234567890', '2345678901', '3456789012',
            '4567890123', '5678901234', '6789012345', '7890123456', '8901234567', '9012345678'
        ];

        for (let sequencia of sequencias) {
            if (sequencia.includes(telefone)) {
                return true;
            }
        }
        return false;
    }
}