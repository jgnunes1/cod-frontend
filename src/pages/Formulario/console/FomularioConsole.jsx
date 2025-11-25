import { Accordion, AccordionTab } from 'primereact/accordion';
import { Toast } from 'primereact/toast';
import React, { useContext, useEffect, useRef, useState } from "react";
import { AcordeaoHeader } from "../../../components/acordeao/AcordeaoHeader";
import PessoaSessao from "../../../modules/Pessoa/sessao/PessoaSessao";
import TelefoneSessao from "../../../modules/Telefone/sessao/TelefoneSessao";
import { FormularioContext } from '../contexto/FomularioContext';
import GrauInstrucaoSessao from '../../../modules/GrauInstrucao/sessao/GrauInstrucaoSessao';
//import useStorage from '../../../hooks/useStorage';

export default function FormularioConsole() {
    const toast = useRef(null);
    //const storage = useStorage();
    //const modo_gestor = storage.obter('modo_gestor') == 'S';

    const contexto = useContext(FormularioContext);
    
    useEffect(() => {
        console.log('contextoFormulario', contexto);
        contexto?.obter(contexto?.id_formulario);
    }, []);

    const createAcordeaoHeader = (titulo, icone, retorno) => (
        <AcordeaoHeader
            titulo={{ descricao: titulo, icone }}
            retorno={retorno}
        />
    );

    // if (contexto?.id_Formulario == null) {
    //     if (contexto?.usuario.perfil != 'SGP') {
    //         return (<><label>Não foram encontrados dados de Formulario para o seu perfil de usuário</label></>);
    //     } else {
    //         return (<>acesse a console de gestão de pessoas</>);
    //     }
    // }

    return (
        <div className="card">
            <h2>Formulario</h2>
            <Toast ref={toast} position="center" />
            <Accordion multiple activeIndex={[]}>
                <AccordionTab header={createAcordeaoHeader(contexto?.item?.nome_social ?? contexto?.item?.nome, 'pi pi-user', contexto?.retorno.pessoa)}>
                    <PessoaSessao contextoMestre={contexto} />
                </AccordionTab>

                <AccordionTab header={createAcordeaoHeader("Grau Instrução", 'pi pi-tag', false, 1, "Exigências", 5, "Orientações Importantes")}>
                    <GrauInstrucaoSessao contextoMestre={contexto} />
                </AccordionTab>

                <AccordionTab header={createAcordeaoHeader("Telefone", 'pi pi-tag', false, 2, "Exigências", 5, "Orientações Importantes")}>
                    <TelefoneSessao contextoMestre={contexto} />
                </AccordionTab>

            </Accordion>
        </div>
    );
}
