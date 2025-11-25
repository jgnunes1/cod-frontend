import React, { useContext, useEffect } from "react";
//import PorConsole from "../../../components/consoles/PorConsole";
import { EnderecoContext } from "../context/EnderecoContext";
import EnderecoForm from "../form/EnderecoForm";
import { EnderecoSpec } from "../spec/EnderecoSpec";
import ResumoAnaliseConsole from "../../Analise/console/ResumoAnaliseConsole"
import { renderJSON } from "../../../components/json/renderJson";
import BaseConsole from "../../../components/consoles/BaseConsole";

export default function EnderecoConsole({ contextoMestre = null}) {
    const spec = EnderecoSpec;
    const contexto = useContext(EnderecoContext);
    const prepararContextoMestre = { id_mestre: contextoMestre?.id_formulario, coluna_mestre: "id_pessoa" };

    useEffect(() => {
        contexto?.obterPor('id_pessoa', contextoMestre?.id_formulario);
    }, []);

    const cabecalho = (<section className="colunas-2">
        <section></section>
        <ResumoAnaliseConsole
            titulo="Análise do Endereço"
            detalhesAnalise={contexto?.item?._detalhes}
            spec={spec}
        />
    </section>)



    return (<>
        <BaseConsole
            contextoMestre={prepararContextoMestre}
            cabecalho={cabecalho}
        >
            <EnderecoForm 
            spec={spec} 
            item={contexto?.item} 
            setItem={contexto?.setItem} 
            salvar={contexto?.salvar} 
            editar={contexto?.editar} 
            setMunicipios={contexto?.setMunicipios} 
            contexto={contexto}
            />

        </BaseConsole>

        {/* {renderJSON(contexto?.item)} */}
    </>);

}
