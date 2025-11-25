import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import useProcessaForm from "../../hooks/useProcessaForm";
import FormDialog from "../dialog/FormDialog";
import InfoDialog from "../dialog/InfoDialog";
import { Toast } from 'primereact/toast';
import { useRef } from "react";
import MensagemDialog from "../../modules/shared/components/MensagemDialog";
import AnaliseConjuntoDadosOrientacoes from "../../modules/shared/components/Orientacoes/AnaliseConjuntoDadosOrientacoes";
import { renderJSON } from "../json/renderJson";

function BaseForm({
    titulo = "",
    valoresFormulario = null,
    setValoresFormulario = null,
    spec = null,
    visible = false,
    setVisible = null,
    handleSubmit = null,
    carregando = false,
    cabecalho = null,
    rodape = null,
    children = null,
    erros = null,
    setErros = null,
    contexto = null,
    contextoMestre = null,
}) {

    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [mensagemDialog, setMensagemDialog] = useState(false);
    const [formDialog, setFormDialog] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    // const label = exibirForm ? "Fechar" : "Editar";
    // const icon = exibirForm ? "pi pi-check" : "pi pi-pencil";
    const toast = useRef(null);

    const handleMensagem = (mensagem) => {
        console.log('dialog', mensagem);
        setDialogMessage(mensagem.detail);
    }

    useEffect(() => {
        if (contexto?.mensagem !== null) {
            console.log('mensagem', contexto.mensagem);
            if (contexto.mensagem.status === 200) {
                showMensagem(contexto?.mensagem?.mensagem);
            }
            if (contexto.mensagem.status === 201) {
                setMensagemDialog(true);
            }
        }
    }, [contexto?.mensagem]);

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(e, handleMensagem);
    }

    const showMensagem = (str = "") => {
        toast.current.show({ severity: 'info', summary: 'Informações', detail: str, life: 3000 });
    };


    const formPadrao = () => {
        return (
            <>
                {cabecalho}
                <form onSubmit={submit}>
                    {spec.inputs(contexto).map((itens) => useProcessaForm({ itens, erros, setErros, valoresFormulario, setValoresFormulario, contexto, contextoMestre }))}
                    {children}
                    {carregando ? <div className="carregando">Carregando...</div> :
                        <div style={{ overflow: 'hidden', padding: '10px' }}>
                            <Button style={{ float: 'right' }} label="Salvar" type="submit" />
                        </div>}
                </form>
                {rodape}
                <InfoDialog
                    titulo={'Informação'}
                    visible={dialogVisible}
                    setVisible={setDialogVisible}
                    style={{ width: "40vw" }}
                >
                    <p>{dialogMessage}</p>
                </InfoDialog>


            </>)
    }

    const ComFormDialog = () => {
        return (
            <FormDialog titulo={titulo} visible={visible} setVisible={setVisible}>
                {formPadrao()}
            </FormDialog>
        )
    }

    const form = visible ? ComFormDialog() : formPadrao();
    const orientacoes = (<><AnaliseConjuntoDadosOrientacoes exibirForm={exibirForm} setExibirForm={setExibirForm} documento={titulo} /></>);

    function fecharMensagemDialog() {
        setMensagemDialog(false);
        setExibirForm(false);
    }

    const exibicao = contexto?.item?._detalhes ? exibirForm ? form : orientacoes : form

    return (
        <div>
            {/* {renderJSON(contexto?.item)} */}
            {exibicao}
            {/* Renderizando o conteúdo adicional passado através de children */}
            <MensagemDialog visible={mensagemDialog} mensagem={contexto?.mensagem?.mensagem} onClose={fecharMensagemDialog} />
            <Toast ref={toast} />
        </div>
    );
}

export default BaseForm;

