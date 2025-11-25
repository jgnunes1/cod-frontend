export default function ValidacaoArquivo(valor) {
    //console.log('ValidacaoArquivo valor:', valor);
    // Verifica se o valor está vazio
    if (valor.size == 0) {
        return 'O campo é obrigatório';
    }
    
    // Verifica se o arquivo tem a extensão .pdf
    if (!valor.name.toLowerCase().endsWith('.pdf')) {
        return 'O arquivo deve estar no formato .pdf';
    }

    return null;
}
