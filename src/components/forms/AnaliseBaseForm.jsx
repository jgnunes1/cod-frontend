import Dexie from "dexie";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog"; // Para exibir o diálogo
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from "react";
import ArquivosButton from "../../modules/Pessoa/components/ArquivosButton";
import ValidarDialog from "../../modules/Pessoa/components/ValidarDialog";
import MensagemDialog from "../../modules/shared/components/MensagemDialog";
import LabelEditarInput from "./input/LabelEditarInput";


const db = new Dexie('ArquivosDB');
db.version(1).stores({
    dadosPessoais: 'nome,conteudo'
});

function AnaliseBaseForm({
    spec = null,
    item = null,
    setItem = null,
    children = null,
    arquivos = null,
    setArquivos = null,
    onSubmit = null,
    contexto = null,
}) {
    const [permitirSalvar, setPermitirSalvar] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [showDialogAnalise, setShowDialogAnalise] = useState(false);
    const [validarDialogVisible, setValidarDialogVisible] = useState(false); // Estado para o ValidarDialog
    const [errosValidacao, setErrosValidacao] = useState({}); // Estado para armazenar os erros de validação
    const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
    //const [status, setStatus] = useState({});


    const [mensagemDialog, setMensagemDialog] = useState(false);
    const toast = useRef(null);

    // Gerar o objeto com os atributos `name` inicializados como `null`
    const inicialStatus = spec.inputs().flat()
        .reduce((acc, campo) => {
            if (campo.name) {
                acc[campo.name] = { valido: null, mensagem: null, validar: campo?.validar || (() => null) }; // Inicializa cada atributo como `null`
                //console.log("rodando",campo);
            }
            return acc;
        }, {});

    // Inicializar o estado com o objeto gerado
    const [status, setStatus] = useState(inicialStatus);

    // useEffect(() => {
    //     if (item?._detalhes === undefined || item?._detalhes === null) return;
    //     setShowDialogAnalise(true);
    //     tratarItensEmAnalise();
    //     setShowDialogAnalise(false);
    //     // const timer = setTimeout(() => {            
    //     //   setShowDialogAnalise(false);
    //     // }, 5000);      
    //     //return () => clearTimeout(timer);
    // }, [item?._detalhes]);

    const handleMensagem = (mensagem) => {
        // console.log('dialog', mensagem);
        setDialogMessage(mensagem.detail);
    }

    const showMensagem = (str = "") => {
        // toast.current.show({ severity: 'info', summary: 'Informações', detail: str, life: 3000 });
    };

    useEffect(() => {
        if (contexto?.mensagem !== null) {
            // console.log('mensagem', contexto.mensagem);

            const statusArray = [200, 201, 422]; // Array de status permitidos
            if (statusArray.includes(contexto.mensagem.status)) {
                if (contexto.mensagem.status === 200) {
                    console.log(contexto?.mensagem?.mensagem);
                    showMensagem(contexto?.mensagem?.mensagem);
                } else {
                    setMensagemDialog(true);
                }
            }
        }
    }, [contexto?.mensagem]);




    // const tratarItensEmAnalise = async () => {
    //     if (item?._detalhes === undefined || item?._detalhes === null) return null;
    //     let novoItem = { ...item };
    //     await Object.keys(item?._detalhes?.solicitacao?.pedido).forEach((campo) => {
    //         if (campo === "arquivo") {
    //             Object.keys(item?._detalhes?.solicitacao?.pedido[campo]).forEach((arquivo) => {
    //                 if (item?._detalhes?.solicitacao?.pedido[campo][arquivo] == null) return;
    //                 const objetoSalvar = { nome: arquivo, conteudo: item?._detalhes?.solicitacao?.pedido[campo][arquivo] };
    //                 db?.dadosPessoais?.put(objetoSalvar);
    //             });
    //         }
    //         novoItem[campo] = item?._detalhes?.solicitacao?.pedido[campo];
    //         handleValue(item?._detalhes?.solicitacao?.pedido[campo], campo);
    //     });
    //     setItem(novoItem);
    // };



    const handleValidar = async (e) => {
        e.preventDefault();
        try {
            await obterArquivosDB();
            const novoStatus = { ...status };

            Object.entries(status).forEach(([key, valor]) => {
                if (valor?.validar) {
                    let str = valor?.validar(item[key]);
                    if (str !== null) {
                        str = valor?.validar(item?._detalhes?.solicitacao?.pedido?.[key]);
                    }
                    novoStatus[key] = {
                        valido: (str === null),
                        mensagem: str,
                        validar: valor?.validar || (() => { }),
                    };
                }
            });

            setStatus(novoStatus);

            // Verificar se existem erros
            const erros = Object.entries(novoStatus).filter(([_, campo]) => !campo.valido);
            if (erros.length > 0) {
                const errosObj = Object.fromEntries(erros);
                setErrosValidacao(errosObj); // Atualiza o estado dos erros
                setValidarDialogVisible(true); // Exibe o ValidarDialog
                return;
            }

            return novoStatus; // Retorna o status atualizado para uso no handleSubmit
        } catch (error) {
            // console.error("Erro na validação:", error);
            throw error; // Propaga o erro para que handleSubmit possa capturá-lo
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validacao = await handleValidar(e);
            const algumInvalido = Object.values(validacao).some((campo) => !campo.valido);

            if (algumInvalido) {
                // console.log("Validação falhou:", validacao);
                return; // Interrompe o fluxo caso haja erro na validação
            }

            if (onSubmit) {
                onSubmit(e); // Continua com a submissão caso a validação seja bem-sucedida
            }
        } catch (error) {
            console.log("Erro ao executar handleValidar:", error);
        }
    };

    const fecharValidarDialog = () => {
        setValidarDialogVisible(false);
    };
    const obterArquivosDB = async () => {
        try {
            const identidade = await db.dadosPessoais.get("identidade");
            const cpf = await db.dadosPessoais.get("cpf");
            const pis = await db.dadosPessoais.get("pis");
            const certidao_casamento = await db.dadosPessoais.get("certidao_casamento");
            const deficiencias = await db.dadosPessoais.get("deficiencias");
            const estrangeiro = await db.dadosPessoais.get("estrangeiro");
            const arquivo = {
                identidade: identidade?.conteudo || null,
                cpf: cpf?.conteudo || null,
                pis: pis?.conteudo || null,
                certidao_casamento: certidao_casamento?.conteudo || null,
                deficiencias: deficiencias?.conteudo || null,
                estrangeiro: estrangeiro?.conteudo || null,
            };
            setItem({ ...item, arquivo: arquivo }); // precisa ser no singular
            console.log("Arquivos obtidos do IndexedDB:", arquivo);
        } catch (err) {
            console.error("Erro ao verificar arquivo no IndexedDB:", err);
        }
    };

    const removerMask = (value, mask) => {
        if (value === null || value === undefined) {
            return value;
        }
        if (mask === "data") return value.replace(/[^\d]/g, "").replace(/^(\d{2})(\d{2})(\d{4})$/, "$3-$2-$1");

        if (["cpf", "cep", "cel", "pis"].includes(mask)) return value.replace(/[^\d]/g, "");
        return value;
    };

    const handleValue = (value, name, mask = null) => {
        // console.log('handleValue', value, name, mask);
        const novoItem = name !== "nome" ? { ...item, [name]: mask ? removerMask(value, mask) : value } : { ...item, ...value };
        // console.log('novoItem', novoItem);
        setItem(novoItem);
    };

    const handleArquivoChange = async (item) => {
        setArquivos([...arquivos, item]);
    };

    // const renderCampoAnalise= (campo) => {
    //     console.log("verificando ser temos daddos em analise", campo);
    //     return null;
    // }

    const tratarNome = (chave, data) => {
        if (chave !== 'nome') {
            if (chave == 'deficiencias') return data[chave] == null ? 'NÃO' : 'SIM';
            if (chave == 'estrangeiro') return data[chave] == null ? 'NÃO' : 'SIM';
            return data[chave] || null
        }
        return {
            nome: data[chave],
            nome_social: data?.nome_social,
            nome_receita: data?.nome_receita,
            id_tipo_identidade_genero: data?.id_tipo_identidade_genero
        };
    }

    const renderCampo = (i) => item && (
        <LabelEditarInput
            id={i?.name}
            label={i?.label}
            value={tratarNome(i.name, item)}
            valueAnalise={
                (i.name == 'deficiencias') || (i.name == 'estrangeiro') ?
                    item?.[i.name]?._detalhes?.solicitacao?.pedido :
                    (item?._detalhes?.solicitacao?.pedido?.[i.name] || null)

            }
            status={status[i.name] || null}
            handleValue={handleValue}
            validar={i?.validar}
            typeInput={i?.analiseType || null}
            apiSchema={i?.apiSchema || null}
            apiUrl={i?.apiUrl || null}
            mask={i?.mask || null}
            arquivo={i?.arquivo || null}
            idsObrigatorios={i?.idsObrigatorios || null}
            orientacoes={i?.orientacoes || null}
            onArquivoChange={handleArquivoChange}
            outros={
                (i.name == 'deficiencias' || i.name == 'estrangeiro') && item?.[i.name]
            }
        />
    );

    const renderCampos = (campo) => campo.map((c) => renderCampo(c));

    const renderLinhas = () => {
        return spec?.inputs().map((linhas, i) => (
            <section key={`section-${i}`} className={`colunas-${linhas.length}`}>{renderCampos(linhas)}</section>
        ));
    };

    const renderResumoAnalise = () => {
        if (item?._detalhes == undefined || item?._detalhes == null) return null;
        return (
            <section style={{ marginTop: '0.5em' }}>
                <section className="sublinhado-dotted negrito"> <i className='pi pi-receipt laranja' />Você possui itens em análise:</section>
                <p>Este é um resumo da análise dos dados pessoais.</p>
                <p>Para mais informações, consulte a análise completa.</p>
            </section>
        )
    };

    const renderArquivosAnalise = () => {
        if (!item?._detalhes) return null;
        const arquivos = [
            { arquivo: "identidade", title: "RG" },
            { arquivo: "cpf", title: "CPF" },
            { arquivo: "pis", title: "PIS" },
            { arquivo: "certidao_casamento", title: "Cert." },
            { arquivo: "deficiencias", title: "PCD" },
            { arquivo: "estrangeiro", title: "Estr." }
        ];
        return (
            <ArquivosButton
                titulo="Documentos em Análise (em desenv):"
                analise={true}
                //icone="pi pi-receipt"
                arquivos={arquivos}
            />
        );
    };

    const renderArquivosApidoc = () => {
        //if (!item?._detalhes) return null;
        const arquivos = [
            { arquivo: "identidade", title: "RG" },
            { arquivo: "cpf", title: "CPF" },
            { arquivo: "pis", title: "PIS" },
            { arquivo: "certidao_casamento", title: "Cert." },
            { arquivo: "deficiencias", title: "PCD" },
            { arquivo: "estrangeiro", title: "Estr." }
        ];
        return (
            <ArquivosButton
                titulo="Documentos (em desenv):"
                // icone="pi pi-verified"
                arquivos={arquivos}
            />
        );
    };

    const menuInferior = (
        <section style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'space-between', alignItems: 'center' }}>
            {/* {renderResumoAnalise()} */}
            {renderArquivosAnalise()}
            {renderArquivosApidoc()}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingTop: '3%',
                overflow: 'hidden',
            }}>
                <Button
                    style={{ float: 'right', marginLeft: "0.25em" }}
                    label="Salvar"
                    onClick={handleSubmit}
                // disabled={!permitirSalvar}
                />
                {/* <Button
                    style={{ float: 'right' }}
                    label="Validar"
                    onClick={handleValidar}
                /> */}
            </div>
        </section>);

    const renderPreparandoAnalise = () => {
        if (item?._detalhes == undefined || item?._detalhes == null) return null;

        return (

            <Dialog
                header="Verificando Dados Cadastrais que estão em análise"
                visible={showDialogAnalise}
            >
                <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".3s" />

                <p> .. essa tarefa requer um pouco tempo.</p>
            </Dialog>
        )
    }

    function fecharMensagemDialog() {
        setMensagemDialog(false);
    }

    // Função assíncrona para processar os itens
    const tratarItensEmAnalise = async () => {
        if (!item?._detalhes) return;
        let novoItem = { ...item };
        const campos = Object.keys(item?._detalhes?.solicitacao?.pedido || {});

        for (const campo of campos) {
            if (campo === "arquivo") {
                for (const arquivo of Object.keys(item?._detalhes?.solicitacao?.pedido[campo] || {})) {
                    const conteudo = item?._detalhes?.solicitacao?.pedido[campo][arquivo];
                    if (conteudo) {
                        const objetoSalvar = { nome: arquivo, conteudo };
                        await db.dadosPessoais.put(objetoSalvar); // Salva no IndexedDB
                    }
                }
            }
            novoItem[campo] = item?._detalhes?.solicitacao?.pedido[campo];
        }

        setItem(novoItem);
    };

    // useEffect para iniciar o processamento
    useEffect(() => {
        const iniciarProcessamento = async () => {
            console.log(item?._detalhes)
            if (item?._detalhes === undefined || item?._detalhes === null) return;
            setIsLoading(true);
            setShowDialogAnalise(true);
            await tratarItensEmAnalise();
            setShowDialogAnalise(false);
            setIsLoading(false); // Concluído o carregamento
        };

        iniciarProcessamento();
    }, [item?._detalhes]);

    // Renderização condicional
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ProgressSpinner />
            </div>
        );
    }

    return (
        <div key="1">
            {children}
            {renderLinhas()}
            {menuInferior}
            {renderPreparandoAnalise()}
            <MensagemDialog visible={mensagemDialog} tipo={contexto.mensagem?.status} mensagem={contexto?.mensagem?.mensagem} onClose={fecharMensagemDialog} />
            <Toast ref={toast} />
            <ValidarDialog
                visible={validarDialogVisible}
                onClose={fecharValidarDialog}
                status={errosValidacao} // Passa os erros para o ValidarDialog
            />
            {/* {renderJSONC(item)}  */}
            {/* {renderJSON(status)} */}
        </div>
    );
}

export default AnaliseBaseForm;
