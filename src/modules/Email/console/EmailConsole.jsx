import React, { useContext, useEffect } from "react";
// import DetalheConsole from "../../../components/consoles/DetalheConsole";
// import AcordeaoDataTable from "../../../components/datatable/AcordeaoDataTable";
import { EmailContext } from "../context/EmailContext";
// import EmailForm from "../form/EmailForm";
import BaseConsole from "../../../components/consoles/BaseConsole";
import CarrosselCartao from "../../../components/forms/CarrosselCartao";
import EmailForm from "../form/EmailForm";
import { EmailSpec } from "../spec/EmailSpec";


export default function EmailConsole({ contextoMestre = null }) {
    const spec = EmailSpec;
    const contexto = useContext(EmailContext);
    const prepararContextoMestre = { id_mestre: contextoMestre?.id_formulario, coluna_mestre: "id_pessoa" };

    useEffect(() => {
        contexto?.obterDetalhe(contextoMestre?.id_formulario);
    }, []);

    return (<>
        <BaseConsole
            contextoMestre={prepararContextoMestre}
        >
            <CarrosselCartao
                titulo="Email"
                campoExibicao="endereco"
                itens={contexto?.itens}
                contexto={contexto}
                contextoMestre={contextoMestre}
                spec={spec}
                FormComponente={EmailForm}
            />

            {/* {renderJSON(contexto?.itens)} */}

        </BaseConsole>
    </>);

}
