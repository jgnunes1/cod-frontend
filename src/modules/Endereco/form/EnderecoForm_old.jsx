import React, { useEffect } from "react";
import { EnderecoSpec } from "../spec/EnderecoSpec";
import BaseForm from "../../../components/forms/BaseForm";
import { obterTodosOsDados } from "../../../hooks/useDexie";
import ArquivoInput from "../../../components/forms/input/ArquivoInput";
import { renderJSON } from "../../../components/json/renderJson";

export async function buscarMunicipios(id_uf) {
   // console.log('id_uf_buscarMunicipios', id_uf);
    const registros = await obterTodosOsDados('ReposTipos', 'municipio');
    const formattedOptions = registros
        .filter(item => item.id_unidade_federativa === id_uf)
        .map(item => ({
            key: item.id,
            name: item.nome,
        }));
    //console.log('formattedOptionsObter', formattedOptions);
    return formattedOptions; // Certifique-se de retornar o valor
}


export default function EnderecoForm({ contextoMestre = null, contexto = null, id = null, formDialog = false, visible = false, setVisible = null, salvar = null, cabecalho = null, children }) {
    const spec = EnderecoSpec;
    
    useEffect(() => {
        const carregarMunicipios = async () => {
            if (contexto?.item?.id_uf) {
                    //console.log('uf', contexto.item.id_uf);
                    const formattedOptions = await buscarMunicipios(contexto.item.id_uf);
                    //console.log('formattedOptions dentro do useEffect', formattedOptions);
                        contexto.setMunicipios(formattedOptions);

            }
        };
    
        carregarMunicipios(); // Executa a função assíncrona
    }, [contexto?.item?.id_uf]); // Dependência correta
    
    const inputComprovanteResidencia = (<>
        <ArquivoInput
            label="Comprovante de Residência" 
            name="comprovante_residencia" 
            type="file"
            value={null}
            onChange={() => {}}
            onBlur={() => {}}
            error={null}
            id="comprovante_residencia"
            disabled={false}
            tabela="endereco"
        />  
        
            </>)

    return (
        <BaseForm
            titulo="Endereco"
            contexto={contexto}
            visible={visible}
            setVisible={setVisible}
            spec={spec}
            salvar={salvar}
            id={id}
            formDialog={formDialog}
            contextoMestre={contextoMestre}
            colunaPesquisa={contextoMestre?.coluna_mestre}
            valorPesquisa={contextoMestre?.id_formulario}
            cabecalho={cabecalho}
        >
            {inputComprovanteResidencia}
            <section>
                Esse é o Children do Endereco
            </section>
        </BaseForm>
    );
}
