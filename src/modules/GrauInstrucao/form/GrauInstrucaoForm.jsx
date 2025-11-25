import React, { useEffect, useState } from "react";
import BaseForm from "../../../components/forms/BaseForm";
import { obterTodosOsDados } from "../../../hooks/useDexie";
// import { Toast } from 'primereact/toast';
// import { useRef } from "react";
// import MensagemDialog from "../../shared/components/MensagemDialog";
import Dexie from "dexie";
import Orientacoes from "../../../pages/Formulario/components/Orientacoes.jsx";
import CarregandoDialog from "../../shared/components/CarregandoDialog";
import PDFUploadButton from "../../shared/components/PDFUploadButton";

const db = new Dexie('ArquivosDB');
db.version(1).stores({
    grauInstrucao: 'nome,conteudo'
});

export default function GrauInstrucaoForm({
    spec = null,
    item = null,
    setItem = null,
    salvar = null,
    editar = null,
    contexto = null
}) {
    //const [setValoresFormulario, valoresFormulario] = useState(item);
    const [formDialog, setFormDialog] = useState(false);
    const [errors, setErrors] = useState({});
    //const [mensagemDialog, setMensagemDialog] = useState(false);
    //const [itemAnalise, setItemAnalise] = useState(null);
    // const [exibirForm, setExibirForm] = useState(false);
    // const label = exibirForm ? "Fechar" : "Editar";
    // const icon = exibirForm ? "pi pi-check" : "pi pi-pencil";
    // const toast = useRef(null);

    // useEffect(() => {
    //     if (contexto?.mensagem !== null) {
    //         console.log('mensagem', contexto.mensagem);
    //         if (contexto.mensagem.status === 200)  {
    //             showMensagem(contexto?.mensagem?.mensagem);
    //         }
    //         if (contexto.mensagem.status === 201) {
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

    // const showMensagem = (str = "") => {
    //     toast.current.show({ severity: 'info', summary: 'Informações', detail: str, life: 3000 });
    // };

    async function buscarArquivos(databaseName, tabela) {
        const arquivos = await obterTodosOsDados(databaseName, tabela);
        return arquivos;
    }

    const handleSubmit = async (e, handleMensagem) => {
        console.log('Formulário submetido', e);

        try {
            const arquivos = await buscarArquivos('ArquivosDB', 'grauInstrucao');
            // Verifica se há arquivos e atribui o conteúdo ao item
            if (arquivos.length > 0) {
                item.arquivo = arquivos[0].conteudo;
            } else {
                console.warn('Nenhum arquivo encontrado!');
            }

            // validação
            const input = spec.inputs();
            let formIsValid = true;
            const currentErrors = { ...errors };

            // Coletar os dados do formulário
            const formData = new FormData(e.target);
            const formDataArray = Array.from(formData.entries());

            const convertToISOFormat = (value) => {
                const [day, month, year] = value.split('/'); // Dividir no formato DD/MM/YYYY
                return `${year}-${month}-${day}`; // Reorganizar para YYYY-MM-DD
            };

            // Iterar sobre as entradas e exibir name e value
            input.forEach((specs) => {
                specs.forEach((spec) => {
                    // Tenta encontrar o campo no formDataArray
                    const formDataMatch = formDataArray.find(([name]) => name === spec.name);

                    if (formDataMatch) {
                        const [name, value] = formDataMatch;

                        if (spec.validar) {
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
            });

            // Transformar datas para o formato correto (YYYY-MM-DD)
            formData.forEach((value, name) => {
                //console.log('name', name);
                // Se o campo for uma data (você pode ajustar essa verificação conforme a necessidade)
                if (name.includes("data") && value) {
                    const isoFormattedDate = convertToISOFormat(value);
                    console.log('dataBaseForm-Iso', isoFormattedDate); // Verificar a data no console
                    item[name] = isoFormattedDate;
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

            const retorno = await db.grauInstrucao.get("certificado");

            if (!retorno) {
                currentErrors.arquivo = "O arquivo não foi selecionado. Por favor, selecione o arquivo antes de continuar.";
                // setErrors(currentErrors);
                //return;
            }


            console.log(currentErrors);
            setErrors(currentErrors);

            if (Object.keys(currentErrors).length === 0) {
                await obterArquivosDB();

                if (item.id) {
                    console.log('Editar item', item);
                    editar(item);
                } else {
                    console.log('Criar item', item);
                    salvar(item);
                }
            } else {
                console.error('Erro ao validar o formulário');
                handleMensagem('Verifique os campos obrigatórios!');
            }
        } catch (error) {
            console.error('Erro ao buscar arquivos', error);
        }


    }

    //console.log('erros', errors);


    // const orientacoes = (
    //     <>
    //         <hr />
    //         <strong>Orientações sobre a análise dos dados do Grau de Instrução:</strong>
    //         <hr />
    //         Você gerou um protocolo para alteração dos dados do <b>Grau de instrução</b>. É possível consultar o andamento através do botão <i className="pi pi-receipt" /> <b>"Itens em Análise"</b>.<br />
    //         Caso deseje alterar os dados, clique no botão <i className="pi pi-pencil" /> "Editar".<br />
    //         <strong>Importante:</strong><br />
    //         <section>Se o protocolo estiver com status <b>em análise</b>, não será possível editar os dados.</section>
    //         <section>Se o protocolo estiver com status <b>aguardando</b> ou <b>em exigência</b>, será possível editar os dados.</section>
    //         <hr/>
    //         { contexto?.item?._detalhes && <Button label={label} icon={icon} onClick={() => setExibirForm(!exibirForm)} /> }

    //     </>
    // );

    // const inputGrauInstrucao = (<>
    //     <section>
    //         {/* <Button label="Documento  Salvo do Certificado" icon="pi pi-file" /> */}
    //     </section>
    //     <section>
    //         <ArquivoInput
    //             label="Certificado"
    //             name="arquivo_certificado"
    //             type="file"
    //             value={null}
    //             onChange={() => { }}
    //             onBlur={ValidacaoArquivo}
    //             error={errors['arquivo_certificado']}
    //             id="certificado"
    //             disabled={false}
    //             tabela="grauInstrucao"
    //             required={true}
    //         />
    //     </section>

    // </>)

    const obterArquivosDB = async () => {
        try {
            const arquivo = await db.grauInstrucao.get("certificado");
            setItem({ ...item, arquivo: arquivo }); // precisa ser no singular
            console.log("Arquivos obtidos do IndexedDB:", arquivo);
        } catch (err) {
            console.error("Erro ao verificar arquivo no IndexedDB:", err);
        }
    };

    const inputGrauInstrucao = (
        <>
            <section className="p-fluid">
                <PDFUploadButton obrigatorio={true} nome={'certificado'} tabela="grauInstrucao" />
                <small> {errors?.arquivo && <p>{errors.arquivo}</p>}</small>
            </section>
        </>)

    const form = (
        <BaseForm
            titulo="Grau de Instrução"
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
            {inputGrauInstrucao}
            <CarregandoDialog visible={contexto?.carregando} />
        </BaseForm>
    );

    // const exibicao = contexto?.item?._detalhes ? exibirForm ? form : orientacoes : form

    // function fecharMensagemDialog() {
    //     setMensagemDialog(false);
    //     setExibirForm(false);
    // }

    return (
        <>
            <Orientacoes titulo={spec.orientacao.titulo} texto={spec.orientacao.texto} />
            {form}
            {/* {renderJSON()} */}
            {/* <MensagemDialog visible={mensagemDialog} mensagem={contexto?.mensagem?.mensagem} onClose={fecharMensagemDialog} />
            <Toast ref={toast} /> */}
        </>
    );
}
