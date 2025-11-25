import ValidacaoBase from '../../../components/validacoes/ValidacaoBase';
import { ValidacaoEmail } from '../../../components/validacoes/ValidacaoPorRegex';

export const EmailSpec = {
    schema: { id: '', cpf: '', nome: '' },
    console: { titulo: "Email", mensagem: "essa é a mensagem" },
    orientacao: {
        titulo: "Orientação", texto: ["Atualize o e-mail, caso necessário. É possível cadastrar mais de um e-mail. ",
            "Para verificar os e-mails já cadastrados, clique nas setas ao lado do quadro.",]
    },
    inputs() {
        return [
            [{ type: "SimouNaoInput", key: 2, label: "Principal", name: "principal" },
            { type: "SelecaoInput", key: 1, label: "Tipo", name: "id_tipo_meio_comunicacao", apiSchema: "tipos", apiUrl: "tipo_meio_comunicacao", validar: ValidacaoBase },],
            [{ type: "TextoInput", key: 3, label: "E-mail", name: "endereco", placeholder: "exemplo@email.com", validar: ValidacaoEmail },],
            // [{ type: "AreaTextoInput", key: 4, label: "Descrição", name: "descricao" },],
        ]
    },

    dataTable() {
        return [
            {
                id: "email",
                selectionMode: false,
                newMode: true,
                editMode: true,
                deleteMode: true,
                columns: [
                    {
                        id: 2,
                        field: "principal",
                        header: "Principal",
                        style: { width: "20%", maxWidth: '200px', whiteSpace: 'pre-wrap', align: 'center' }
                    },
                    {
                        id: 1,
                        field: "endereco",
                        header: "E-mail",
                        style: { width: "40%", maxWidth: '200px', whiteSpace: 'pre-wrap' }
                    },

                ],
            },
        ]
    }
}