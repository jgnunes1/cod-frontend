import React from "react";
import  FormularioConsole  from "../console/FomularioConsole";
import FormularioProvider from "../contexto/FomularioContext";

function FormularioSessao({ contextoMestre = null, contextoProprio = null }) {
    return (
        <FormularioProvider>
            <FormularioConsole contextoMestre={contextoMestre} contextoProprio={contextoProprio} />
        </FormularioProvider>
    );
}

export default FormularioSessao;