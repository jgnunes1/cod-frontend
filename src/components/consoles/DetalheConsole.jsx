import React, { useEffect } from "react";
import BaseConsole from "./BaseConsole";

export default function DetalheConsole({ contextoMestre = null, spec = null, contexto = null, FormComponent = null, cabecalho=null, ResumoAnaliseComponent = null, VisualizarComponent = null, DataTable = null, formDialog = true }) {

    useEffect(() => {
        contexto?.obterDetalhe(contextoMestre?.id_formulario);
    }, []);

    return (
        <BaseConsole
            contextoMestre={contextoMestre}
            contexto={contexto}
            spec={spec}
            DataTable={DataTable}
            FormComponent={FormComponent}
            formDialog={formDialog}
            VisualizarComponent={VisualizarComponent}
            ResumoAnaliseComponent={ResumoAnaliseComponent}
            cabecalho={cabecalho}
        />
    );
}
