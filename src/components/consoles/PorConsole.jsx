import React, { useEffect } from "react";
import BaseConsole from "./BaseConsole";

export default function PorConsole({ contextoMestre = null}) {



    return (
        <>
        <BaseConsole
            contextoMestre={contextoMestre}
            // contexto={contexto}
            // spec={spec}
            // FormComponent={FormComponent}
            // formDialog={formDialog}
            // VisualizarComponent={VisualizarComponent}
            // ResumoAnaliseComponent={ResumoAnaliseComponent}
            // cabecalho={cabecalho}
            // metodos={metodos}
        />
        <pre>
            por console
        </pre>
        </>
    );
}
