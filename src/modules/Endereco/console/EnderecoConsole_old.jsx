import React, { useContext, useEffect } from "react";
import PorConsole from "../../../components/consoles/PorConsole";
import { EnderecoContext } from "../context/EnderecoContext";
import EnderecoForm from "../form/EnderecoForm";
import { EnderecoSpec } from "../spec/EnderecoSpec";
import EnderecoResumoAnalise from "../EnderecoResumoAnalise";
import ResumoAnaliseConsole from "../../Analise/console/ResumoAnaliseConsole"
import { renderJSON } from "../../../components/json/renderJson";
import { obterTodosOsDados } from "../../../hooks/useDexie";

export default function EnderecoConsole({ contextoMestre = null, contextoProprio = null }) {
    const spec = EnderecoSpec;
    const contexto = useContext(EnderecoContext);

    const cabecalho = (<section className="colunas-2">
        <section>Novo Cabecalho</section>
        <ResumoAnaliseConsole
            titulo="Análise do Endereço"
            detalhesAnalise={contexto?.item?._detalhes}
            spec={spec}
        />
    </section>)

async function buscarArquivos(databaseName, tabela) {
    const arquivos = await obterTodosOsDados(databaseName, tabela);
    return arquivos;
}
const metodos = {
    obter: () => { },
    salvar: async (itemSalvo) => {
        try {
            // Buscar arquivos de forma assíncrona
            itemSalvo.id_pais_residencia = 39;
            const arquivos = await buscarArquivos('ArquivosDB', 'endereco');
            console.log('arquivos', arquivos);                
            // Verifica se há arquivos e atribui o conteúdo ao item
            if (arquivos.length > 0) {
                itemSalvo.arquivo = arquivos[0].conteudo;

            } else {
                console.warn('Nenhum arquivo encontrado!');
            }    
            console.log("metodo salvar desacoplado", itemSalvo);    
            // Se o item já tem ID, é uma edição; caso contrário, é uma criação
            if (itemSalvo.id) {
                if (contexto) {
                    await contexto.editar(itemSalvo);
                } else {
                    console.error('Contexto não definido para editar');
                }
            } else {
                // Se não tem ID, é um novo item, então salvamos
                if (contextoMestre) {
                    itemSalvo[contextoMestre.coluna_mestre] = contextoMestre.id_formulario;
                }
                if (contexto) {
                    await contexto.salvar(itemSalvo);
                    setIdItem(null);
                } else {
                    console.error('Contexto não definido para salvar');
                }
            }
        } catch (error) {
            // Caso ocorra algum erro durante o processo
            console.error("Erro ao salvar o item:", error);
        }
    },    
    editar: () => { },
}


    return (<>
        <PorConsole
            contextoMestre={contextoMestre}
            spec={spec}
            contexto={contexto}
            FormComponent={EnderecoForm}
            ResumoAnaliseComponent={EnderecoResumoAnalise}
            cabecalho={cabecalho}
            metodos={metodos}
        />

        {renderJSON(contexto?.item)}
    </>);

}
