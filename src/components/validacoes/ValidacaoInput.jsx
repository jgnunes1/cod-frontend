function ValidacaoInput(item, name, value, errors) {
    // Copiar os erros atuais para garantir que erros existentes não sejam removidos
    const currentErrors = { ...errors };    
    let formIsValid = true;

    if (item.name === name && item.validar) {
        const error = item.validar(value);
        if (error) {
            currentErrors[item.name] = error;
            formIsValid = false;
        } else {
            delete currentErrors[item.name];
        }
    }

    return currentErrors;
}
export default ValidacaoInput;