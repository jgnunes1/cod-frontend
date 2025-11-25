import ValidacaoBase from "./ValidacaoBase";

export default function ValidacaoDataUnix(valor) {
    //console.log("valor", valor);

    const erroObrigatorio = ValidacaoBase(valor);
    if (erroObrigatorio) {
        return erroObrigatorio;
    }

    // // Validação de formato para DDMMYYYY ou DD/MM/YYYY
    // if (!/^(\d{2}\/\d{2}\/\d{4}|\d{2}\d{2}\d{4})$/.test(valor)) {
    //     return "Formato inválido";
    // }

    // Extrair partes da data com base no formato
    // let day, month, year;
    // if (valor.includes('/')) {
    //     // Formato DD/MM/YYYY
    //     [day, month, year] = valor.split('/').map(Number);
    // } else {
    //     // Formato DDMMYYYY
    //     day = parseInt(valor.slice(0, 2), 10);
    //     month = parseInt(valor.slice(2, 4), 10);
    //     year = parseInt(valor.slice(4), 10);
    // }

    // // Verificar se a data é válida
    // const dataSelecionada = new Date(year, month - 1, day); // Ajustar mês para zero-indexado
    // if (
    //     dataSelecionada.getFullYear() !== year ||
    //     dataSelecionada.getMonth() !== month - 1 ||
    //     dataSelecionada.getDate() !== day
    // ) {
    //     return "A data inserida não é válida";
    // }

    // // Validação para garantir que a data esteja entre 1900 e a data atual
    // const dataAtual = new Date();
    // const dataMinima = new Date(1900, 0, 1); // 1º de janeiro de 1900
    // if (dataSelecionada < dataMinima || dataSelecionada > dataAtual) {
    //     return `A data está fora do intervalo permitido`;
    // }

    return null;
}
