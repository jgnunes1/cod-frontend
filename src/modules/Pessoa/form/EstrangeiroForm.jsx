import React, { useEffect, useState } from "react";
import BaseForm from "../../../components/forms/BaseForm";
import ArquivoInput from "../../../components/forms/input/ArquivoInput";
import ValidacaoArquivo from "../../../components/validacoes/ValidacaoArquivo";
import { obterTodosOsDados } from "../../../hooks/useDexie";

export async function buscarTipoCondicaoIngresso(valor) {
    const registros = await obterTodosOsDados('ReposTipos', 'tipo_condicao_ingresso_imigrante');
    let formattedOptions = [];

    if (valor === 1) {
        formattedOptions = registros.filter(
            item => (item.id !== 2 && item.id !== 5)).map(item => ({
                key: item.id,
                name: item.nome
            }));
    } else if (valor === 2) {
        formattedOptions = registros.filter(
            item => item.id !== 1).map(item => ({
                key: item.id,
                name: item.nome
            }));
    }
    return formattedOptions; // Certifique-se de retornar o valor
}

export default function EstrangeiroForm({ spec = null, item = null, setItem = null, salvar = null, setCondicaoIngresso = null, editar = null, contexto = null }) {
    const [formDialog, setFormDialog] = useState(false);
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (contexto?.item) {
            console.log(contexto?.item.possui_filho_brasileiro !== null && contexto?.item.possui_filho_brasileiro)
            contexto?.setPossuiFilhos(contexto?.item.possui_filho_brasileiro !== null && contexto?.item.possui_filho_brasileiro);
        }
    }, [contexto?.item]);

    useEffect(() => {
        const carregarCondicaoIngresso = async () => {
            if (item?.id_tipo_condicao_ingresso_imigrante) {
                const formattedOptions = await buscarTipoCondicaoIngresso(item.id_tipo_condicao_ingresso_imigrante);
                setCondicaoIngresso(formattedOptions);
            }
        };

        carregarCondicaoIngresso(); // Executa a função assíncrona
    }, [item?.id_tipo_condicao_ingresso_imigrante]);

    async function buscarArquivos(databaseName, tabela) {
        const arquivos = await obterTodosOsDados(databaseName, tabela);
        return arquivos;
    }

    const handleSubmit = async (e, handleMensagem) => {
        console.log('Formulário submetido', e);
        try {
            const arquivos = await buscarArquivos('ArquivosDB', 'estrangeiro');
            // Verifica se há arquivos e atribui o conteúdo ao item
            if (arquivos.length > 0) {
                item.arquivo = arquivos[0].conteudo;
            } else {
                console.warn('Nenhum arquivo encontrado!');
            }

            // Inserindo validação

            const input = spec.inputs();
            let formIsValid = true;
            const currentErrors = { ...errors };

            const formData = new FormData(e.target);
            const formDataArray = Array.from(formData.entries()); // Transforma o FormData em um array de pares [name, value]

            input.forEach((specs) => {
                specs.forEach((spec) => {
                    // Tenta encontrar o campo no formDataArray
                    const formDataMatch = formDataArray.find(([name]) => name === spec.name);

                    if (formDataMatch) {
                        const [name, value] = formDataMatch;
                        // Se encontrou o campo, faz a validação normal
                        if (spec.validar) {
                            console.log(name, value);
                            const error = spec.validar(value);
                            if (error) {
                                currentErrors[spec.name] = error;
                                formIsValid = false;
                            } else {
                                delete currentErrors[spec.name];
                            }
                        }

                    }
                });

                // formData.forEach((value, name) => {
                //     //console.log('name', name);
                //     if (name.includes("arquivo")) {
                //         if (ValidacaoArquivo(value)) {
                //             currentErrors[name] = ValidacaoArquivo(value);
                //         } else {
                //             delete currentErrors[name];
                //         }
                //     }
                // });

            });

            console.log(currentErrors);
            setErrors(currentErrors);

            if (Object.keys(currentErrors).length === 0) {

                if (item.id) {
                    console.log('Editar item', item);
                    editar(item);

                } else {
                    console.log('Criar item', item);
                    salvar(item);
                }
            } else {
                // setToastParams({ tipo: 'error', titulo: 'Erro ao salvar', mensagem: 'Verifique os campos!', position: 'bottom-right' });
            }
        } catch (error) {
            console.error('Erro ao buscar arquivos', error);
        }
    }



    // const inputComprovanteEstrangeiro = (<>
    //     <ArquivoInput
    //         label="Carteira de Registro Nacional Migratório"
    //         name="arquivo_estrangeiro"
    //         type="file"
    //         value={null}
    //         onChange={() => { }}
    //         onBlur={ValidacaoArquivo}
    //         error={errors['arquivo_estrangeiro']}
    //         id="comprovante_estrangeiro"
    //         disabled={false}
    //         tabela="estrangeiro"
    //         required={true}
    //     />

    // </>)

    return (
        <BaseForm
            visible={formDialog}
            setVisible={setFormDialog}
            valoresFormulario={item}
            setValoresFormulario={setItem}
            handleSubmit={handleSubmit}
            spec={spec}
            erros={errors}
            setErros={setErrors}
            contexto={contexto}
        >
            {inputComprovanteEstrangeiro}
        </BaseForm>
    );

}
