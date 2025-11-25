import React from "react";
import BaseConsole from "./BaseConsole";

export default function MestreConsole({ contextoMestre = null,
    contexto=null,
            spec=null,
            DataTable=null,
            FormComponent=null,
            formDialog=null,
            ResumoAnaliseComponent=null,
            cabecalho=null,
 }) {


    const outros = [];
    return (
        <BaseConsole
            contextoMestre={contextoMestre}
            contexto={contexto}
            spec={spec}
            DataTable={DataTable}
            FormComponent={FormComponent}
            formDialog={formDialog}
           // ResumoAnaliseComponent={ResumoAnaliseComponent}
            cabecalho={cabecalho}
        />
    );
}
