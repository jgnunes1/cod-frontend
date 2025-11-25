import React, { Children, useEffect, useState } from "react";
import { renderJSON } from "../json/renderJson";

function BaseConsole({contextoMestre = null, cabecalho=null, rodape=null, children=null}) {


    return (
        <section>
            {cabecalho}
            {children}
            {/* {renderJSON(contextoMestre)} */}
            {rodape}
        </section>
    )
}


export default BaseConsole;

