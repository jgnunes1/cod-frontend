import GrauInstrucaoConsole from "../console/GrauInstrucaoConsole";
import GrauInstrucaoProvider from "../context/GrauInstrucaoContext";

function GrauInstrucaoSessao({contextoMestre=null,contextoProprio=null}){
    return (
        <GrauInstrucaoProvider>
                     <GrauInstrucaoConsole contextoMestre={contextoMestre} contextoProprio={contextoProprio}/>
        </GrauInstrucaoProvider>
    );
}

export default GrauInstrucaoSessao;