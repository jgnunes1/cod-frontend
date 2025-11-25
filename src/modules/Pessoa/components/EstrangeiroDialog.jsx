import Dexie from 'dexie';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react';
import { renderJSON } from '../../../components/json/renderJson';
import useProcessaForm from '../../../hooks/useProcessaForm';
import { EstrangeiroSpec } from '../spec/EstrangeiroSpec';
import PDFUploadButton from '../../shared/components/PDFUploadButton';

const db = new Dexie('ArquivosDB');
db.version(1).stores({
    dadosPessoais: 'nome,conteudo'
});

const EstrangeiroDialog = ({ isVisible, setIsVisible, onSave = null, data = null }) => {

    const spec = EstrangeiroSpec;
    const [erros, setErros] = useState({});
    const [item, setItem] = useState(() => {
        return {
            casado_com_nacional: data?.casado_com_nacional ?? false,
            possui_filho_brasileiro: data?.possui_filho_brasileiro ? data?.possui_filho_brasileiro : false,
            data_naturalizacao: data?.data_naturalizacao ? data?.data_naturalizacao : null,
            numero_decreto_naturalizacao: data?.numero_decreto_naturalizacao ?? null,
            data_publicacao_dou_naturalizacao: data?.data_publicacao_dou_naturalizacao ? data?.data_publicacao_dou_naturalizacao : null,
            numero_registro_estrangeiro: data?.numero_registro_estrangeiro ?? null,
            id_tipo_tempo_residencia_imigrante: {
                tipo: data?.id_tipo_tempo_residencia_imigrante ?? null,
                subTipo: data?.id_tipo_condicao_ingresso_imigrante ?? null,
            },
            data_chegada_brasil: data?.data_chegada_brasil ? data?.data_chegada_brasil : null,
            quantidade_filhos_brasileiros: data?.quantidade_filhos_brasileiros ?? null,
        };
    });

    const handleFechar = () => {
        setIsVisible(false);
        //setDeficienciaChecked(false);
    };


    const salvar = async (e) => {
        e.preventDefault();
        // Resetando erros
        setErros({});
        let validationErrors = {};

        try {
            const retorno = await db['dadosPessoais'].get("estrangeiro");
            if (!retorno) {
                validationErrors.arquivo = "O arquivo não foi selecionado. Por favor, selecione o arquivo antes de continuar.";
                renderErrors(validationErrors);
                return;
            }

            const convertToISOFormat = (value) => {
                const [day, month, year] = value.split('/'); // Dividir no formato DD/MM/YYYY
                return `${year}-${month}-${day}`; // Reorganizar para YYYY-MM-DD
            };

            // validação            
            const input = spec.inputs();
            let formIsValid = true;
            validationErrors = { ...erros };

            input.forEach((specs) => {
                specs.forEach((spec) => {
                    const formDataMatch = Object.entries(item).find(([name]) => name === spec.name);
                    if (formDataMatch) {
                        const [name, value] = formDataMatch;
                        // Validar o campo se necessário
                        if (spec.validar) {
                            const error = spec.validar(value);
                            if (error) {
                                validationErrors[spec.name] = error;
                                formIsValid = false;
                                renderErrors(validationErrors);
                                return;
                            } else {
                                delete validationErrors[spec.name];
                            }
                        }
                        //     // Se o campo for uma data (você pode ajustar essa verificação conforme a necessidade)
                        //     if (name.includes("data") && value) {
                        //         const isoFormattedDate = convertToISOFormat(value);
                        //         console.log('dataBaseForm-Iso', isoFormattedDate); // Verificar a data no console
                        //         item[name] = isoFormattedDate;
                        //     }
                    }
                });
            });


            // Se houver erros, atualizar o estado e parar o fluxo
            console.log('JSON Gerado:', item);
            console.log('validationErrors:', validationErrors);
            renderErrors(validationErrors);

            if (Object.keys(validationErrors).length === 0) {
                if (onSave) {
                    console.log("onSave", item);
                    onSave(item); // Callback com os dados gerados
                    setIsVisible(false); // Fecha o modal após salvar
                }
            }

        } catch (erro) {
            console.error('Erro ao salvar:', erro);
            validationErrors.arquivo = "Erro ao validar o arquivo. Tente novamente.";
            renderErrors(validationErrors);
        }
        console.log("final", validationErrors);
    };

    const footer = (
        <div>
            <Button
                label="Fechar"
                icon="pi pi-times"
                className="p-button-secondary"
                style={{ marginRight: '0.25em' }}
                onClick={handleFechar}
            />
            <Button
                label="Salvar"
                icon="pi pi-check"
                className="p-button-success"
                type='submit'
                form="estrangeiroForm" // Conecta o botão ao formulário.
            />
        </div>
    );

    const renderErrors = (errors) => {
        if (Object.keys(errors).length > 0) {
            setErros(errors);
            return;
        }
    };

    return (
        <Dialog
            header="Informações do Estrangeiro"
            visible={isVisible}
            style={{ width: '70vw' }}
            footer={footer}
            modal
            onHide={handleFechar}
        >
            <form id='estrangeiroForm' onSubmit={salvar}>
                {spec.inputs().map((itens) => useProcessaForm({ itens, erros, setErros, valoresFormulario: item, setValoresFormulario: setItem }))}
            </form>

            <div style={{ marginTop: '2rem' }}>
                <small> {erros?.arquivo && <p>{erros.arquivo}</p>}</small>
                <PDFUploadButton obrigatorio={true} nome="estrangeiro" rotulo="Documento Estrangeiro" />
            </div>

         {/*    {renderJSON(item)} */}
        </Dialog>
    );
};

export default EstrangeiroDialog;
