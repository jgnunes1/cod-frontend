const useToken = () => {
  const chave = 'token';
    function  obter(){
        return localStorage.getItem(chave);
    }

    function salvar(str=""){
        localStorage.setItem(chave, str);
    }
    function limpar(){
        localStorage.removeItem(chave);
    }    

    return {
        obter,
        salvar,
        limpar
    }
}

export default useToken;