import { ValidacaoPis11 } from "./ValidacaoPorRegex";

export default function ValidarPis(valor) {

    if (ValidacaoPis11(valor) != null) {
        return ValidacaoPis11(valor);
    }

    if (!ValidaPis(valor)) {
        return "Pis inválido";
    }

    return null;
}

function ValidaPis(numero) {
    // Converte o número em um array de dígitos
    let numeros = numero.split('').map((valor) => parseInt(valor, 10));

    let soma10Digitos = 0;
    let numeroIdeal = [];

    // Pesos a serem aplicados aos dígitos
    const pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    numeros.forEach((valor, indice) => {
        // Apenas para os 10 primeiros dígitos
        if (indice <= 9) {
            numeroIdeal.push(valor);
            soma10Digitos += valor * pesos[indice];
        }
    });

    // Calcula o resto da divisão por 11
    const restoDivisao = soma10Digitos % 11;
    let resultado = 11 - restoDivisao;

    // Define o dígito verificador
    let digitoVerificador = resultado === 10 || resultado === 11 ? 0 : resultado;

    // Adiciona o dígito verificador ao número ideal
    numeroIdeal.push(digitoVerificador);

    // Retorna se o número validado corresponde ao original
    return numeros.join('') === numeroIdeal.join('');
}
