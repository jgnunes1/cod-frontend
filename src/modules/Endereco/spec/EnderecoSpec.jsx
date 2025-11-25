import ValidacaoBase from "../../../components/validacoes/ValidacaoBase";
import ValidarCEP from "../../../components/validacoes/ValidarCep";
import useCep from "../../../hooks/useCep";
import { buscarMunicipios } from "../form/EnderecoForm";

function enderecoExterno(e, contexto) {

    const { name, value } = e.target;
    contexto?.setEnderecoExterno(value);
}
async function buscarCep(e, contexto) {
    const endereco = await useCep(e.target.value);
    console.log('enderecoSpec', endereco)
    endereco &&
        listarMunicipios({ target: { value: endereco.id_uf } }, contexto);
}

async function listarMunicipios(e, contexto) {

    const { value } = e.target;
    const formattedOptions = await buscarMunicipios(value);
    console.log('EndereçoSpec', formattedOptions)
    contexto?.setMunicipios(formattedOptions);

}

export const EnderecoSpec = {
    tabelaArquivo: "endereco",
    orientacao: {
        titulo: "Orientação",
        texto: ["Atualize o endereço, caso necessário. Só é possível cadastrar um endereço.  ",
            "Caso seja necessária alguma alteração, apresente novo comprovante de residência."]
    },
    inputs(contexto) {
        return [
            // [
            //     { type: "SimouNaoInput", key: 2, label: "End. Principal?", name: "principal", disabled: true },
            //      { type: "SimouNaoInput", key: 1, label: "Local residencia", name: "local_residencia", disabled: true },
            //     { type: "SimouNaoInput", key: 3, label: "End. estrangeiro?", name: "endereco_estrangeiro", onChange: enderecoExterno , disabled: true  },
            // ],

            /* Estrangeiro enderecoExterno == S */
            //falta código postal

            /* Brasil enderecoExterno == N */
            [
                { type: "MascaraInput", key: 5, label: "CEP", name: "cep", mask: "cep", mostrarComponente: !contexto?.enderecoExterno, onChange: buscarCep, validar: ValidarCEP },
                //  { type: "SelecaoInput", key: 4, label: "Tipo de logradouro", name: "id_tipo_logradouro", apiSchema: "tipos", apiUrl: "tipo_logradouro", mostrarComponente: !contexto?.enderecoExterno, validar: ValidacaoBase },
                /* Comum aos 2 */
                { type: "TextoInput", key: 6, label: "Logradouro", name: "logradouro", validar: ValidacaoBase },
                { type: "TextoInput", key: 7, label: "Número", name: "numero", validar: ValidacaoBase },
            ],

            [
                { type: "TextoInput", key: 8, label: "Complemento", name: "complemento" },
                { type: "TextoInput", key: 9, label: "Bairro", name: "bairro", validar: ValidacaoBase },
            ],

            /* Brasil */
            [
                { type: "SelecaoInput", key: 12, label: "UF", name: "id_uf", apiSchema: "repo", apiUrl: "unidade_federativa", mostrarComponente: !contexto?.enderecoExterno, onChange: listarMunicipios, validar: ValidacaoBase },
                { type: "SelecaoInput", key: 10, label: "Municipio", name: "id_municipio", mostrarComponente: !contexto?.enderecoExterno, options: contexto?.municipios, apiUrl: "municipio", validar: ValidacaoBase },
            ],
            [
                /* Estrangeiro */
                { type: "TextoInput", key: 11, label: "Cidade (exterior)", name: "nome_cidade", mostrarComponente: contexto?.enderecoExterno, validar: ValidacaoBase },
                { type: "SelecaoInput", key: 13, label: "País de residência", name: "id_pais_residencia", apiSchema: "repo", apiUrl: "pais", mostrarComponente: contexto?.enderecoExterno, validar: ValidacaoBase },
            ],
            // [
            //     { type: "ArquivoInput", key: 14, label: "Comprovante de Residência", name: 'comprovante_residencia', tabela: 'endereco'/* multiple: false, validar: ValidacaoUpload */ }
            // ],
        ]
    },

    dataTable() {
        return [
            {
                id: "endereco",
                selectionMode: false,
                newMode: true,
                editMode: true,
                deleteMode: true,
                columns: [

                    {
                        id: 1,
                        field: "cep",
                        header: "CEP",
                    },
                    {
                        id: 2,
                        field: "descricao_logradouro",
                        header: "Logradouro",
                    },
                ],
            },
        ]
    }
}