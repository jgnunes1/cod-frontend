const useSessionStorage = () => {
    function salvar(chave="",valor={}){
        if (chave === ""){
            return;
        }
        sessionStorage.setItem(chave, JSON.stringify(valor));
    }
    function obter(chave=""){
        if (chave === ""){
            return;
        }
        const valor = sessionStorage.getItem(chave);
        return JSON.parse(valor);        
    }
    function remover(chave=""){
        if (chave === ""){
            return;
        }
        sessionStorage.removeItem(chave);
    }  

    function limpar(){
        sessionStorage.clear();
    }  

    return {
        salvar,
        obter,
        remover,
        limpar
    } 
}
export default useSessionStorage;