import { Button } from "primereact/button";
import React from "react";
import Orientacoes from '../components/Orientacoes';

export default function FinalizarAlteracoesOrientacoes({ onClick = null }) {

    const orientacaoFinalizacao = {
        titulo: "Orientações sobre a finalização das alterações",
        texto: [
            "Antes de finalizar as alterações, verifique se todos os campos foram preenchidos corretamente," +
            "e se todos os documentos necessários para comprovação foram adicionados."
        ]
    }

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    }

    return (
        // <section>
        //     <section className="sublinhado-dotted negrito orientacoes">
        //         <i className="pi pi-info-circle azul" style={{ fontSize: "1.5em", marginRight: "0.5em" }} />
        //         Orientações sobre a finalização das alterações:
        //     </section>
        //     <section className="colunas-70-30">
        //         <p>
        //             Antes de finalizar as alterações, verifique se todos os campos foram preenchidos corretamente, e se todos os documentos necessários para comprovação foram adicionados.
        //         </p>
        //         <section>
        //             <Button label="Finalizar Alterações" icon="pi pi-check" onClick={handleClick} style={{ margin: "0.5em" }} />
        //         </section>
        //     </section>

        // </section>
        <section className='colunas-70-30'>
            <Orientacoes titulo={orientacaoFinalizacao.titulo} texto={orientacaoFinalizacao.texto} />
            <section className="flex flex-row-reverse align-items-end">
                <Button label="Finalizar Alterações" icon="pi pi-check" onClick={handleClick} style={{ margin: "0.5em" }} />
            </section>
        </section >

    );
}
