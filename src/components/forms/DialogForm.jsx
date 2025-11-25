import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import useProcessaForm from "../../hooks/useProcessaForm";
import InfoDialog from "../dialog/InfoDialog";
import { Dialog } from "primereact/dialog";
import AnaliseConjuntoDadosOrientacoes from "../../modules/shared/components/Orientacoes/AnaliseConjuntoDadosOrientacoes";
import { renderJSON } from "../json/renderJson";
import { renderJSONC } from "../json/renderJsonC";

function DialogForm({
    titulo = null,
    valoresFormulario = null,
    setValoresFormulario = null,
    width = "50vw",
    spec = null,
    visible = false,
    setVisible = null,
    handleSubmit = null,
    handleClose = null,
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
    const [exibirForm, setExibirForm] = useState(false);    
    const toast = useRef(null);    

    // useEffect(() => {
    //     console.log('contexto', contexto);
    //     contexto?.mensagem && handleMensagem(contexto?.mensagem);
    // }, [contexto?.mensagem]);

    useEffect(() => {
        if (contexto?.mensagem !== null) {
            console.log('mensagem', contexto?.mensagem);
            if (contexto?.mensagem.status === 200) {
                showMensagem(contexto?.mensagem?.mensagem);
            }
            if (contexto?.mensagem.status === 201) {
                setMensagemDialog(true);
            }
        }
    }, [contexto?.mensagem]);

    const handleMensagem = (mensagem) => {
        console.log('dialog', mensagem);
        setDialogMessage(mensagem.detail);
    }

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(e, handleMensagem);
    }

    const showMensagem = (str = "") => {
        toast.current.show({ severity: 'info', summary: 'Informações', detail: str, life: 3000 });
    };


    const onClose = (e) => {
        e.preventDefault();
        handleClose();
    }


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
                            <Button style={{ float: 'right', marginRight:"0.25rem" }} label="Fechar" onClick={onClose} />
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

    const form = formPadrao();
    //const orientacoes = (<><AnaliseConjuntoDadosOrientacoes exibirForm={exibirForm} setExibirForm={setExibirForm} documento={titulo} /></>);
    const orientacoes = (<><AnaliseConjuntoDadosOrientacoes exibirForm={exibirForm} setExibirForm={setExibirForm} documento={titulo} /></>);

    const exibicao = contexto?.item?._detalhes ? exibirForm ? form : orientacoes : form


    return (
        <div>

            <Dialog
                header={titulo}
                visible={visible}
                style={{ width: width }}
                onHide={() => setVisible(false)}
            >     
            {exibicao}   
            {/* {renderJSON(contexto)}   */}
         
            </Dialog>

                
        </div>
    );
}

export default DialogForm;

