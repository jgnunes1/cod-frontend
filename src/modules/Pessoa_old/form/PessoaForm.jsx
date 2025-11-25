import React, { useEffect } from "react";
import BaseForm from "../../../components/forms/BaseForm";
import { PessoaSpec } from "../spec/PessoaSpec";


export default function PessoaForm({ contextoMestre = null, formDialog = false, id = null, contexto = null, visible = false, setVisible = null, salvar = null }) {
    const spec = PessoaSpec;

    useEffect(() => {
        if (contexto?.item) {
            contexto?.setPossuiFilhos(contexto?.item.possui_filho_brasileiro);
            contexto?.setImigrante(contexto?.item.imigrante);
            contexto?.setPossuiDeficiencia(contexto?.item.possui_deficiencia);
        }
    }, [contexto?.item]);

    return (
        <>
            <BaseForm
                titulo="Dados Pessoais"
                contexto={contexto}
                visible={visible}
                setVisible={setVisible}
                spec={spec}
                salvar={salvar}
                id={id}
                formDialog={formDialog}
                contextoMestre={contextoMestre}
            />
        </>
    );

}
