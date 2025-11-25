import React, { useState,useEffect, useRef } from "react";
//import BaseForm from "../../../components/forms/BaseForm";
import { renderJSON } from "../../../components/json/renderJson";
import DialogForm from "../../../components/forms/DialogForm";
import { Toast } from 'primereact/toast';
import MensagemDialog from "../../shared/components/MensagemDialog";
import CarregandoDialog from "../../shared/components/CarregandoDialog";
export default function TelefoneForm({
    titulo = "Telefone",
    spec = null,
    item = null,
    setItem = null,
    salvar = null,
    editar = null,
    visible = false,
    setVisible = null,    
    contexto = null
}) {

    const [formDialog, setFormDialog] = useState(false);
    const [errors, setErrors] = useState({});

        const [mensagemDialog, setMensagemDialog] = useState(false);
        const toast = useRef(null);
    
    
        useEffect(() => {
            if (contexto?.mensagem !== null) {
                console.log('mensagem', contexto.mensagem);
                if (contexto?.mensagem?.status === 200) {
                    showMensagem(contexto?.mensagem?.mensagem);
                }
                if (contexto?.mensagem?.status === 201 || contexto?.mensagem?.status=== 422) {
                    setMensagemDialog(true);
                }
            }
        }, [contexto?.mensagem]);
    
        const showMensagem = (str = "") => {
            toast.current.show({ severity: 'info', summary: 'Informações', detail: str, life: 3000 });
        };

    const handleSubmit = async (e, handleMensagem) => {
        const input = spec.inputs();
        let formIsValid = true;
        const currentErrors = { ...errors };

        // Coletar os dados do formulário
        const formData = new FormData(e.target);
        const formDataArray = Array.from(formData.entries()); // Transforma o FormData em um array de pares [name, value]

        // Iterar sobre as entradas e exibir name e value
        let obrigatorio = true;
        input.forEach((specs) => {
            specs.forEach((spec) => {
                // Tenta encontrar o campo no formDataArray
                const formDataMatch = formDataArray.find(([name]) => name === spec.name);

                if (formDataMatch) {
                    const [name, value] = formDataMatch;
                    //console.log(name, value);
                    // Se encontrou o campo, faz a validação normal
                    if (spec.validar) {
                        const error = spec.validar(value);
                        if (error) {
                            currentErrors[spec.name] = error;
                            formIsValid = false;
                        } else {
                            delete currentErrors[spec.name];
                        }
                    }

                } else if (obrigatorio && spec.type === 'RadioButtonInput' && !spec.disabled && spec.validar) {
                    // Caso o campo não exista no formDataArray e seja RadioButtonInput
                    const error = spec.validar(null); // Valida como não preenchido
                    if (error) {
                        currentErrors[spec.name] = error;
                        formIsValid = false;
                    } else {
                        delete currentErrors[spec.name];
                    }
                }
            });
        });

        console.log(currentErrors);
        setErrors(currentErrors);

        if (Object.keys(currentErrors).length === 0) {
            try {
                if (item.id) {
                    editar(item);

                } else {
                    salvar(item);

                }
            } catch (error) {
                handleMensagem('Verifique os campos obrigatórios!');
                console.error('Erro ao buscar arquivos', error);
            }
        }
    }

    function handleClose(){
        setMensagemDialog(false);
        setVisible(false);
    }

console.log('titulo', titulo);
    return (
        <DialogForm
            titulo={titulo}
            valoresFormulario={item}
            setValoresFormulario={setItem}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            spec={spec}
            erros={errors}
            setErros={setErrors}
            visible={visible}
            setVisible={setVisible}
            contexto={contexto}
        >
            <Toast ref={toast} />
            <MensagemDialog visible={mensagemDialog} tipo={contexto?.mensagem?.status} mensagem={contexto?.mensagem?.mensagem}  erros={contexto?.mensagem?.erros} onClose={handleClose} />
            <CarregandoDialog visible={contexto?.carregando} />

        {/* {renderJSON(contexto?.mensagem)} */}
        </DialogForm>
    );
}
