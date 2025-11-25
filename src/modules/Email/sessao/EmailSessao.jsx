import React from "react";
import EmailConsole from "../console/EmailConsole";
import EmailProvider from "../context/EmailContext";

function EmailSessao({contextoMestre=null,contextoProprio=null}){
    return (
        <EmailProvider>
                     <EmailConsole contextoMestre={contextoMestre} contextoProprio={contextoProprio}/>
        </EmailProvider>
    );
}

export default EmailSessao;