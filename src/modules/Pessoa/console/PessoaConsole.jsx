import React, { useContext, useEffect } from "react";
import { PessoaContext } from "../context/PessoaContext";
import PessoaForm from "../form/PessoaForm";
import { PessoaSpec } from "../spec/PessoaSpec";
import BaseConsole from "../../../components/consoles/BaseConsole";
import Orientacoes from "../../../pages/Formulario/components/Orientacoes";


function PessoaConsole({ contextoMestre = null, contextoProprio = null }) {
    const spec = PessoaSpec;
    const contexto = contextoProprio == null ? useContext(PessoaContext) : contextoProprio;

    useEffect(() => {
        contexto?.obter(contextoMestre?.id_formulario);
    }, []);

    const prepararContextoMestre = { id_mestre: contextoMestre?.id_formulario, coluna_mestre: "id_pessoa" };

    const orientacoes = {
        titulo: "Orientações sobre os dados pessoais",
        texto: [
            "Nesta seção, você pode revisar e atualizar as informações pessoais." +
            "É essencial anexar documentos comprobatórios para validar os dados fornecidos, garantindo a " +
            "confiabilidade e a precisão do registro. Certifique-se de preencher todos os campos obrigatórios e " +
            "anexar os arquivos necessários."
        ]
    }

    const legenda = {
        titulo: "Legenda",
        texto: [
            <i className="pi pi-pen-to-square azul" style={{ marginRight: "0.3em" }} />,
            "Dados já preenchidos.",
            <i className="pi pi-pen-to-square laranja" style={{ marginRight: "0.3em", marginLeft: "2em" }} />,
            "Dados não preenchidos.",
            <i className="pi pi-receipt laranja" style={{ marginRight: "0.3em", marginLeft: "2em" }} />,
            "Dados alterados, sob análise."
        ]
    }

    const cabecalho = (<section className="colunas-2">
        <div>
            <Orientacoes titulo={orientacoes.titulo} texto={orientacoes.texto} />
        </div>
        <div>
            <Orientacoes titulo={legenda.titulo} texto={legenda.texto} />
        </div>
        {/* <ResumoAnaliseConsole
            titulo="Análise dos Dados Pessoais"
            detalhesAnalise={contexto?.item?._detalhes}
            spec={spec}
        /> */}
    </section>)
    return (
        <>
            <BaseConsole
                contextoMestre={prepararContextoMestre}
                cabecalho={cabecalho}
            />
            <PessoaForm
                spec={spec}
                item={contexto?.item}
                setItem={contexto?.setItem}
                salvar={contexto?.salvar}
                editar={contexto?.editar}
                contexto={contexto}
                contextoMestre={contextoMestre}
            />
            {/*renderJSON(contexto?.item)}
            { {renderJSON(contextoMestre)} */}
        </>
    );
}

export default PessoaConsole;