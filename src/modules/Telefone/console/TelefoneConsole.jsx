import React, { useContext, useEffect } from "react";
import BaseConsole from "../../../components/consoles/BaseConsole";
import { TelefoneContext } from "../context/TelefoneContext";
import { TelefoneSpec } from "../spec/TelefoneSpec";
import CarrosselCartao from "../../../components/forms/CarrosselCartao";
import TelefoneForm from "../form/TelefoneForm";
import { renderJSON } from "../../../components/json/renderJson";

export default function TelefoneConsole({ contextoMestre = null }) {
    const spec = TelefoneSpec;
    const contexto = useContext(TelefoneContext);
    const prepararContextoMestre = { id_mestre: contextoMestre?.id_formulario, coluna_mestre: "id_pessoa" };

    useEffect(() => {
        contexto?.obterDetalhe(contextoMestre?.id_formulario);
    }, []);

    return (<>
        <BaseConsole
            contextoMestre={prepararContextoMestre}
        >
            <CarrosselCartao
                titulo="Telefone"
                campoExibicao="numero"
                itens={contexto?.itens}
                contexto={contexto}
                contextoMestre={contextoMestre}
                spec={spec}
                FormComponente={TelefoneForm}
            />


        </BaseConsole>
    </>);


}
