import React, { useContext } from "react";
import { BancosSpec } from "../specs/BancosSpec";
import { BancosContext } from "../context/BancosContext";
import MestreConsole from "../../../components/consoles/MestreConsole";
import BancosForm from "../form/BancosForm";
import MestreDataTable from "../../../components/datatable/MestreDataTable";

export default function BancosConsole({contextoMestre=null,contextoProprio=null}) {
    const spec = BancosSpec;
    const contexto = useContext(BancosContext);    

    return (<>
                <MestreConsole 
                   contextoMestre={contextoMestre} 
                   spec={spec} 
                   contexto={contexto} 
                   DataTable={MestreDataTable}
                   FormComponent={BancosForm} />
            </>);

}
