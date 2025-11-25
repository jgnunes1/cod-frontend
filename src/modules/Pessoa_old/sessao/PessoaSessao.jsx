import React from "react";
import PessoaConsole from "../console/PessoaConsole";
import PessoaProvider from "../context/PessoaContext";

function PessoaSessao({ contextoMestre = null, contextoProprio = null }) {
    return (
        <PessoaProvider>
            <PessoaConsole contextoMestre={contextoMestre} contextoProprio={contextoProprio} />
        </PessoaProvider>
    );
}

export default PessoaSessao;