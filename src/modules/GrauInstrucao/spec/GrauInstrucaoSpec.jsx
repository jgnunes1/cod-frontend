import ValidacaoBase from "../../../components/validacoes/ValidacaoBase"
import ValidacaoData from "../../../components/validacoes/ValidacaoData"

export const GrauInstrucaoSpec = {
    schema: { id: '', cpf: '', nome: '' },
    console: { titulo: "GrauInstrucao", mensagem: "essa é a mensagem" },
    tabelaArquivo: "grauInstrucao",
    orientacao: { titulo: "Orientação", texto: ["Colocar o grau de instrução mais alto.",] },
    inputs() {
        let k = 1;
        return [
            [{ type: "SelecaoInput", key: k++, label: "Grau de instrução", name: "id_tipo_grau_instrucao", apiSchema: "tipos", apiUrl: "tipo_grau_instrucao", validar: ValidacaoBase },
            { type: "MascaraInput", key: k++, label: "Data de conclusão", name: "data_conclusao", mask: 'data', validar: ValidacaoData },],
            [{ type: "TextoInput", key: k++, label: "Estabelecimento de conclusão", name: "estabelecimento_conclusao", validar: ValidacaoBase },],
            [{ type: "AreaTextoInput", key: k++, label: "Observação", name: "observacao" },],
            // [
            //     { type: "ArquivoInput", key: k++, label: "Certificado", name: 'certificado', tabela: 'grauInstrucao', validar: ValidacaoArquivo, /*multiple: false,  validar: ValidacaoUpload */ }
            // ],
        ]
    },

    dataTable() {
        return [
            {
                id: "grauInstrucao",
                selectionMode: false,
                newMode: true,
                editMode: true,
                deleteMode: true,
                columns: [
                    {
                        id: 1,
                        field: "id_tipo_grau_instrucao",
                        header: "Grau instrução",
                    },
                    {
                        id: 2,
                        field: "estabelecimento_conclusao",
                        header: "Estabelecimento",
                    },
                    {
                        id: 3,
                        field: "data_conclusao",
                        header: "Data de conclusão",
                    },
                ],
            },
        ]
    }
}