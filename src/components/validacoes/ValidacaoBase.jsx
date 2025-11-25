export default function ValidacaoBase(valor) {
    
    if (valor === null || valor === undefined || valor === '') {
        return 'O campo é obrigatório';
    }
    
    return null;
}