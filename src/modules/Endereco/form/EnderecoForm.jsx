import React, { useEffect, useState } from "react";
import BaseForm from "../../../components/forms/BaseForm";
import ArquivoInput from "../../../components/forms/input/ArquivoInput";
import ValidacaoArquivo from "../../../components/validacoes/ValidacaoArquivo";
import { obterTodosOsDados } from "../../../hooks/useDexie";
import { renderJSON } from "../../../components/json/renderJson";
import { Toast } from 'primereact/toast';
import { useRef } from "react";
import MensagemDialog from "../../shared/components/MensagemDialog";
import CarregandoDialog from "../../shared/components/CarregandoDialog";
import Orientacoes from "../../../pages/Trabalhador/components/Orientacoes";


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

export default function EnderecoForm({ spec = null, item = null, setItem = null, salvar = null, editar = null, setMunicipios = null, contexto = null }) {
    const [formDialog, setFormDialog] = useState(false);
    const [errors, setErrors] = useState({});

    // const [mensagemDialog, setMensagemDialog] = useState(false);
    // const toast = useRef(null);


    // useEffect(() => {
    //     if (contexto?.mensagem !== null) {
    //         console.log('mensagem', contexto.mensagem);
    //         if (contexto.mensagem.status === 200) {
    //             showMensagem(contexto?.mensagem?.mensagem);
    //         }
    //         if (contexto.mensagem.status === 201 || contexto.mensagem.status === 422) {
    //             setMensagemDialog(true);
    //         }
    //     }
    // }, [contexto?.mensagem]);

    useEffect(() => {
        if (contexto?.item?._detalhes) {
            atualizarItem();
        }
    }, [contexto?.item?._detalhes]);


    const atualizarItem = () => {
        const detalhesPedido = contexto?.item?._detalhes?.solicitacao?.pedido;
        if (detalhesPedido) {
            const novoItem = {
                ...item,
                ...detalhesPedido,
                _detalhes: item._detalhes,
            };
            contexto?.setItem(novoItem);
        }
    };

    const showMensagem = (str = "") => {
        toast.current.show({ severity: 'info', summary: 'Informações', detail: str, life: 3000 });
    };

    useEffect(() => {
        const carregarMunicipios = async () => {
            if (item?.id_uf) {
                const formattedOptions = await buscarMunicipios(item.id_uf);
                setMunicipios(formattedOptions);
            }
        };
        carregarMunicipios(); // Executa a função assíncrona
    }, [item?.id_uf]); // Dependência correta

    async function buscarArquivos(databaseName, tabela) {
        const arquivos = await obterTodosOsDados(databaseName, tabela);
        return arquivos;
    }

    const handleSubmit = async (e, handleMensagem) => {
        console.log('Formulário submetido', e);
        try {
            const arquivos = await buscarArquivos('ArquivosDB', 'endereco');
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

                formData.forEach((value, name) => {
                    //console.log('name', name);
                    if (name.includes("arquivo")) {
                        if (ValidacaoArquivo(value)) {
                            currentErrors[name] = ValidacaoArquivo(value);
                        } else {
                            delete currentErrors[name];
                        }
                    }
                });

            });

            console.log(currentErrors);
            setErrors(currentErrors);

            if (Object.keys(currentErrors).length === 0) {
                item.id_pais_residencia = 1;
                if (item.id) {
                    console.log('Editar item', item);
                    editar(item);
                } else {
                    console.log('Criar item', item);
                    salvar(item);
                }
            } else {
                handleMensagem('Verifique os campos obrigatórios!');
                // setToastParams({ tipo: 'error', titulo: 'Erro ao salvar', mensagem: 'Verifique os campos!', position: 'bottom-right' });
            }
        } catch (error) {
            console.error('Erro ao buscar arquivos', error);
        }
    }



    const inputComprovanteResidencia = (<>
        <ArquivoInput
            label="Comprovante de Residência"
            name="arquivo_endereco"
            type="file"
            value={null}
            onChange={() => { }}
            onBlur={ValidacaoArquivo}
            error={errors['arquivo_endereco']}
            id="comprovante_residencia"
            disabled={false}
            tabela="endereco"
            required={true}
        />

    </>)

    const form = (
        <>
            <Orientacoes titulo={spec.orientacao.titulo} texto={spec.orientacao.texto} />
            <BaseForm
                titulo="Endereço"
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
                {inputComprovanteResidencia}
                {/* <Toast ref={toast} />
        <MensagemDialog visible={mensagemDialog} tipo={contexto?.mensagem?.status} mensagem={contexto?.mensagem?.mensagem} erros={contexto?.mensagem?.erros} onClose={() => setMensagemDialog(false)} /> */}
                <CarregandoDialog visible={contexto?.carregando} />

                {/* {renderJSON(contexto?.mensagem)} */}
            </BaseForm>
        </>
    )

    return (
        <>
            {form}
        </>
    );
}
