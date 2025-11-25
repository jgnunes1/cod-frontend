

const useStorage = () => {
    function salvar(chave="",valor={}){
        if (chave === ""){
            return;
        }
        localStorage.setItem(chave, JSON.stringify(valor));
    }
    function obter(chave=""){
        if (chave === ""){
            return;
        }
        const valor = localStorage.getItem(chave);
        return JSON.parse(valor);
    }
    function remover(chave=""){
        if (chave === ""){
            return;
        }
        localStorage.removeItem(chave);
    }  
    function limpar(){
        const termo = obter('termoCiente');
        localStorage.clear();
        salvar('termoCiente',termo);
    }  

    return {
        salvar,
        obter,
        remover,
        limpar
    } 
}
export default useStorage;