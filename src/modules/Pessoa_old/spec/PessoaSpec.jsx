import ValidacaoBase from "../../../components/validacoes/ValidacaoBase";
import ValidacaoData from "../../../components/validacoes/ValidacaoData";
import ValidarCpf from "../../../components/validacoes/ValidarCpf";
import ValidarPis from "../../../components/validacoes/ValidarPis";
import useSessionStorage from "../../../hooks/useSessionStorage";

function possuiFilhoBrasileiro(e, contexto) {

    const { name, value } = e.target;
    contexto?.setPossuiFilhos(value);
}

function possuiDeficiencia(e, contexto) {

    const { name, value } = e.target;
    contexto?.setPossuiDeficiencia(value);
}

function imigrante(e, contexto) {

    const { name, value } = e.target;
    contexto?.setImigrante(value);
}

function verificarCondicao(e, contexto) {

    const { name, value } = e.target;
    const sessionStorage = useSessionStorage();
    const squema = sessionStorage.obter('tipos');
    let formattedOptions = [];

    if (value === 1) {
        formattedOptions = Object.values(squema['tipo_condicao_ingresso_imigrante']).filter(
            item => (item.id !== 2 && item.id !== 5)).map(item => ({
                key: item.id,
                name: item.nome
            }));
    } else if (value === 2) {
        formattedOptions = Object.values(squema['tipo_condicao_ingresso_imigrante']).filter(
            item => item.id !== 1).map(item => ({
                key: item.id,
                name: item.nome
            }));
    }
    contexto?.setCondicaoIngresso(formattedOptions);
}

export const PessoaSpec = {
    schema: { id: '', codigo: '', nome: '', indice: '' },

    inputs(contexto) {
        let k = 1;
        return [
            [{ key: k++, type: "LabelEditarInput", analiseType: "TextoInput", label: "Nome", name: "nome", validar: ValidacaoBase, orientacoes: "Texto com Orientações" }],
            [{ key: k++, type: "LabelInfoInput", label: "Nome Receita Federal", name: "nome_receita", validar: ValidacaoBase, orientacoes: "Texto com Orientações" }],
            [{ key: k++, type: "TextoInput", label: "Nome Social", name: "nome_social" }],
            [{ key: k++, type: "LabelEditarInput", analiseType: "CheckTextoInput", label: "Nome do Pai", name: "nome_pai", validar: ValidacaoBase },
            { key: k++, type: "LabelEditarInput", analiseType: "CheckTextoInput", label: "Nome da Mãe", name: "nome_mae", validar: ValidacaoBase }],

            [{ key: k++, type: "LabelEditarInput", analiseType: "MascaraInput", label: "CPF", name: "cpf", mask: "cpf", validar: ValidarCpf },
            { key: k++, type: "LabelEditarInput", analiseType: "CalendarioInput", label: "Data de Nascimento", name: "data_nascimento", validar: ValidacaoData },],

            [{ key: k++, type: "SelecaoInput", bla: "pais_nascimento", label: "País de Nascimento", name: "id_pais_nascimento", apiUrl: "pais", validar: ValidacaoBase },
            { key: k++, type: "LabelEditarInput", analiseType: "SelecaoInput", label: "Estado Civil", name: "id_tipo_estado_civil",  apiUrl: "tipo_estado_civil", validar: ValidacaoBase },
            ],

            [{ key: k++, type: "RadioButtonInput", label: "Sexo", name: "id_tipo_sexo",  apiUrl: "tipo_sexo", validar: ValidacaoBase },
            { key: k++, type: "SelecaoInput", label: "Identidade de Gênero", name: "id_tipo_identidade_genero",  apiUrl: "tipo_identidade_genero", validar: ValidacaoBase }],
            [{ key: k++, type: "SelecaoInput", label: "Raça/Cor", name: "id_tipo_raca_cor",  apiUrl: "tipo_raca_cor", validar: ValidacaoBase },
            { key: k++, type: "SelecaoInput", label: "Tipo Sanguíneo", name: "id_tipo_sanguineo",  apiUrl: "tipo_sanguineo", validar: ValidacaoBase }],

            [
                { key: k++, type: "RadioButtonInput", label: "Possui Deficiência", name: "possui_deficiencia", onChange: possuiDeficiencia, validar: ValidacaoBase },
                { key: k++, type: "RadioButtonInput", label: "É Imigrante", name: "imigrante", onChange: imigrante, validar: ValidacaoBase },
                { key: k++, type: "TextoInput", label: "Número NIT/PIS/PASEP", name: "numero_nit_pis_pasep", validar: ValidarPis }],

            [{ key: k++, type: "LabelEditarInput", analiseType: "CalendarioInput", label: "Data de Naturalização", name: "data_naturalizacao", mostrarComponente: contexto?.imigrante, validar: ValidacaoData },
            { key: k++, type: "LabelEditarInput", analiseType: "TextoInput", label: "Número do Decreto de Naturalização", name: "numero_decreto_naturalizacao", mostrarComponente: contexto?.imigrante, validar: ValidacaoBase },],

            [{ key: k++, type: "LabelEditarInput", analiseType: "CalendarioInput", label: "Data de Publicação no DOU", name: "data_publicacao_dou_naturalizacao", mostrarComponente: contexto?.imigrante, validar: ValidacaoData, },
            { key: k++, type: "LabelEditarInput", analiseType: "TextoInput", label: "Número de Registro de Estrangeiro", name: "numero_registro_estrangeiro", mostrarComponente: contexto?.imigrante, validar: ValidacaoBase },
            ],

            [{ key: k++, type: "SelecaoInput", label: "Tempo de Residência", name: "id_tipo_tempo_residencia_imigrante",  apiUrl: "tipo_tempo_residencia_imigrante", mostrarComponente: contexto?.imigrante, onChange: verificarCondicao, validar: ValidacaoBase },
            { key: k++, type: "SelecaoInput", label: "Condição de Ingresso", name: "id_tipo_condicao_ingresso_imigrante", options: contexto?.condicaoIngresso, mostrarComponente: contexto?.imigrante, validar: ValidacaoBase },],

            [{ key: k++, type: "CalendarioInput", label: "Data de Chegada no Brasil", name: "data_chegada_brasil", mostrarComponente: contexto?.imigrante, validar: ValidacaoData },
            { key: k++, type: "RadioButtonInput", label: "Casado com Nacional", name: "casado_com_nacional", mostrarComponente: contexto?.imigrante, validar: ValidacaoBase },
            { key: k++, type: "RadioButtonInput", label: "Possui Filho Brasileiro", name: "possui_filho_brasileiro", mostrarComponente: contexto?.imigrante, onChange: possuiFilhoBrasileiro, validar: ValidacaoBase },
            {
                key: k++, type: "NumeroInput", label: "Quantidade de Filhos Brasileiros", name: "quantidade_filhos_brasileiros",
                numberModel: "contInteiro", botoes: true, max: 100, min: 0, mode: "decimal", mostrarComponente: contexto?.possuiFilhos, validar: ValidacaoBase
            }],

        ];
    },


}