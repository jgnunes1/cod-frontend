import React, { useContext } from "react";
import DetalheConsole from "../../../components/consoles/DetalheConsole";
import AcordeaoDataTable from "../../../components/datatable/AcordeaoDataTable";
import { EmailContext } from "../context/EmailContext";
import EmailForm from "../form/EmailForm";
import { EmailSpec } from "../spec/EmailSpec";


export default function EmailConsole({ contextoMestre = null, contextoProprio = null }) {
    const spec = EmailSpec;
    const contexto = useContext(EmailContext);

    const acoes =[
        {label: 'Editar', icon: 'pi pi-pencil', command: (e) => contexto.editar(contexto.item)},
        //{label: 'Visualizar', icon: 'pi pi-eye', command: (e) => contexto.visualizar(contexto.item)},
        {label: 'Apagar', icon: 'pi pi-trash', command: (e) => contexto.setConfirmaApagar(true)}
    ]

    const cabecalho = (
        <>
            <section>novo cabecalho</section>
        </>
    );


    return (<>
        <DetalheConsole
            contextoMestre={contextoMestre}
            spec={spec}
            contexto={contexto}
            DataTable={AcordeaoDataTable}
            FormComponent={EmailForm} 
            cabecalho={cabecalho}
            />
    
    </>);

}
