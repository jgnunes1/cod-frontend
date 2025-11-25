import ValidacaoBase from "./ValidacaoBase";

function ValidarPorRegex(valor, regex, mensagemErro) {
    const erroObrigatorio = ValidacaoBase(valor);
    
    if (erroObrigatorio) {
        return erroObrigatorio;
    }

    return regex.test(valor) ? null : mensagemErro;
}

export function ValidacaoNumero20(valor) {
    const NumeroRegex20 = /^\d{1,20}$/;
    return ValidarPorRegex(valor, NumeroRegex20, "Formato inválido. Limite 20 dígitos numéricos");
}

export function ValidacaoAlfa20(valor) {
    const NumeroRegex20 = /^[a-zA-Z0-9]{1,20}$/; 
    return ValidarPorRegex(valor, NumeroRegex20, "Limite 20 dígitos.");
}


export function ValidacaoNumero1Obrigatorio(valor) {
    const NumeroRegex3 = /^\d{1}$/;
    return ValidarPorRegex(valor, NumeroRegex3, "Formato inválido. Limite 1 dígito numérico");
}

export function ValidacaoEmail(valor) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return ValidarPorRegex(valor, emailRegex, "Formato de email inválido");
}

export function ValidacaoPis11(valor) {
    const NumeroRegex11 = /^\d{11}$/;
    if(valor != ''){
        return NumeroRegex11.test(valor) ? null : "Formato inválido. Limite 11 dígitos numéricos";
    }
}

export function ValidacaoNumero1(valor) {
    const NumeroRegex1 = /^\d{1}$/;
    if(valor != ''){
        return NumeroRegex1.test(valor) ? null : "Formato inválido. Limite 1 dígito numérico";
    }
}
export function SemCaracteresespeciais(valor) {
    const especiaisRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' ]+$/;

        return ValidarPorRegex(valor, especiaisRegex, "Não é permitido caracteres especiais/números");
    
}
