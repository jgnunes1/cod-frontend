import React, { useContext, useEffect } from "react";
import MestreConsole from "../../../components/consoles/MestreConsole";
import { PessoaContext } from "../context/PessoaContext";
import PessoaForm from "../form/PessoaForm";
import { PessoaSpec } from "../spec/PessoaSpec";

function PessoaConsole({ contextoMestre = null, contextoProprio = null }) {
    const spec = PessoaSpec;
    const contexto = contextoProprio == null ? useContext(PessoaContext) : contextoProprio;
    console.log('pessoa', contexto);

    return (
        <>
            <MestreConsole
                contextoMestre={contextoMestre}
                spec={spec}
                contexto={contexto}
                FormComponent={PessoaForm}
            />
        </>
    );
}

export default PessoaConsole;