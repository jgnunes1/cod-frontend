import React from "react";
import { BancosSpec } from "../specs/BancosSpec";
import BaseForm from "../../../components/forms/BaseForm";

export default function BancosForm({ contexto = null, formDialog = false,  id = null, visible = false, setVisible = null, salvar = null }) {
    const spec = BancosSpec;

    return (
        <BaseForm
            titulo="Bancos"
            contexto={contexto}
            visible={visible}
            setVisible={setVisible}
            spec={spec}
            salvar={salvar}
            id={id} 
            formDialog={formDialog}        
        />
    );
}
