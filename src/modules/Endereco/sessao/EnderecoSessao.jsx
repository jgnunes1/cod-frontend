


import EnderecoConsole from "../console/EnderecoConsole";
import EnderecoProvider from "../context/EnderecoContext";

function EnderecoSessao({contextoMestre=null,contextoProprio=null}){
    return (
        <EnderecoProvider>
                     <EnderecoConsole contextoMestre={contextoMestre} contextoProprio={contextoProprio}/>
        </EnderecoProvider>
    );
}

export default EnderecoSessao;