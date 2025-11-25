import React from "react";
import TelefoneConsole from "../console/TelefoneConsole";
import TelefoneProvider from "../context/TelefoneContext";

function TelefoneSessao({contextoMestre=null,contextoProprio=null}){
    return (
        <TelefoneProvider>
                     <TelefoneConsole contextoMestre={contextoMestre} contextoProprio={contextoProprio}/>
        </TelefoneProvider>
    );
}

export default TelefoneSessao;