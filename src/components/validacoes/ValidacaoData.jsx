import ValidacaoBase from "./ValidacaoBase";

export default function ValidacaoData(valor) {

    const erroObrigatorio = ValidacaoBase(valor);
    
    if (erroObrigatorio) {
        return erroObrigatorio;
    }

    // Validação para garantir que a Data não seja no futuro
    const dataAtual = new Date();
    const dataSelecionada = new Date(valor);

    if (dataSelecionada > dataAtual) {
        return "A data não pode ser no futuro";
    }

    return null;
}