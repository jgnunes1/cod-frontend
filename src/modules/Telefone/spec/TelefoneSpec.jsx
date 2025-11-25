import { InputMask } from "primereact/inputmask";
import ValidacaoBase from "../../../components/validacoes/ValidacaoBase"
import React from "react";
import ValidarTelefone from "../../../components/validacoes/ValidarTelefone";

function selecionaMascaraContato(e, contexto) {
    const { name, value } = e.target;
    console.log(name, contexto);
    contexto?.setCelular(value);
}

const telefoneTemplate = (rowData) => {
    console.log(rowData);
    return (
        rowData.celular ?
            <InputMask
                mask="(99) 99999-9999"
                value={rowData.numero}
                readOnly
                className="input-mask-transparent"
            />
            :
            <InputMask
                mask="(99) 9999-9999"
                value={rowData.numero}
                readOnly
                className="input-mask-transparent"
            />
    );
};

export const TelefoneSpec = {
    schema: { id: '', cpf: '', nome: '' },
    console: { titulo: "Telefone", mensagem: "essa é a mensagem" },
    orientacao: {
        titulo: "Orientação", texto: ["Atualize o telefone, caso necessário. É possível cadastrar mais de um número ",
            "de telefone. Para verificar os números já cadastrados, clique nas setas ao lado do quadro ."]
    },
    inputs(contexto) {
        return [
            [{ type: "SimouNaoInput", key: 2, label: "Principal", name: "principal" },
            { type: "SimouNaoInput", key: 3, label: "Celular", name: "celular", onChange: selecionaMascaraContato },
            { type: "SelecaoInput", key: 1, label: "Tipo", name: "id_tipo_meio_comunicacao", apiSchema: "tipos", apiUrl: "tipo_meio_comunicacao", validar: ValidacaoBase },],
            [{ type: "MascaraInput", key: 4, label: "Número", name: "numero", mask: contexto?.celular ? 'cel' : 'fixo', validar: ValidarTelefone },
            { type: "NumeroInput", key: 5, label: "Ramal", name: "ramal" },],
            // [{ type: "AreaTextoInput", key: 6, label: "Descrição", name: "descricao" },]
        ]
    },

    dataTable() {
        return [
            {
                id: "telefone",
                selectionMode: false,
                newMode: true,
                editMode: true,
                deleteMode: true,
                columns: [
                    {
                        id: 1,
                        field: "principal",
                        header: "Principal",
                        style: { width: "15%", maxWidth: '200px', whiteSpace: 'pre-wrap', textAlign: 'center' }

                    },
                    {
                        id: 2,
                        field: "celular",
                        header: "Celular",
                        style: { width: "15%", maxWidth: '200px', whiteSpace: 'pre-wrap', textAlign: 'center' }

                    },

                    {
                        id: 3,
                        field: "numero",
                        header: "Número",
                        style: { width: "40%", maxWidth: '200px', whiteSpace: 'pre-wrap' },
                        body: telefoneTemplate
                    },

                    {
                        id: 4,
                        field: "ramal",
                        header: "Ramal",
                        style: { width: "40%", maxWidth: '200px', whiteSpace: 'pre-wrap' },
                    },

                ],
            },
        ]
    }
}