import React, { useContext, useEffect, useState } from "react";
//import PorConsole from "../../../components/consoles/PorConsole";
import { GrauInstrucaoContext } from "../context/GrauInstrucaoContext";
import GrauInstrucaoForm from "../form/GrauInstrucaoForm";
import { GrauInstrucaoSpec } from "../spec/GrauInstrucaoSpec";
//import ResumoAnaliseConsole from "../../Analise/console/ResumoAnaliseConsole"
import { renderJSON } from "../../../components/json/renderJson";
import BaseConsole from "../../../components/consoles/BaseConsole";

export default function GrauInstrucaoConsole({ contextoMestre = null }) {
    const spec = GrauInstrucaoSpec;
    const contexto = useContext(GrauInstrucaoContext);
    const prepararContextoMestre = { id_mestre: contextoMestre?.id_formulario, coluna_mestre: "id_pessoa" };

    useEffect(() => {
        contexto?.obterPor('id_pessoa', contextoMestre?.id_formulario);
    }, []);


    const cabecalho = (
        <section className="colunas-2">
            <div></div>
            {/* <ResumoAnaliseConsole
                titulo="Análise do Grau de Instrução"
                detalhesAnalise={contexto?.item?._detalhes}
                spec={spec}
            /> */}

        </section>)

   const renderExemplo = () => {
    if (contexto?.item?._detalhes) {
        //console.log("temos detalhes");        
       // contexto?.item?._detalhes?.map((item, index) => {
        return (<>{renderJSON(contexto?.item?._detalhes?.solicitacao?.pedido)}</>)

    }

   }

    return (<>
        <BaseConsole
            contextoMestre={prepararContextoMestre}
            cabecalho={cabecalho}
        >
            <GrauInstrucaoForm
                spec={spec}
                item={contexto?.item}
                setItem={contexto?.setItem}
                salvar={contexto?.salvar}
                editar={contexto?.editar}
                contexto={contexto} />

        </BaseConsole>
        {/* {renderJSON(contexto?.item)} */}
    </>);

}
