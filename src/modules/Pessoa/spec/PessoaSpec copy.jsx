import ValidacaoBase from "../../../components/validacoes/ValidacaoBase";
import ValidacaoData from "../../../components/validacoes/ValidacaoData";
import { SemCaracteresespeciais } from "../../../components/validacoes/ValidacaoPorRegex";
import ValidarCpf from "../../../components/validacoes/ValidarCpf";
import ValidarPis from "../../../components/validacoes/ValidarPis";

function possuiDeficiencia(e, contexto) {

    const { name, value } = e.target;
    contexto?.setPossuiDeficiencia(value);
}

function nomeSocial(e, contexto) {

    const { name, value } = e.target;
    contexto?.setNomeSocial(value === 2 || value === 3);
}

function imigrante(e, contexto) {

    const { name, value } = e.target;
    contexto?.setImigrante(value !== 39);
}

export const PessoaSpec = {
    tabelaArquivo: "dadosPessoais",
    inputs(contexto) {
        let k = 1;

        return [
            [{ key: k++, type: "LabelEditarInput", analiseType: "TextoInput", label: "Nome", name: "nome", validar: SemCaracteresespeciais, orientacoes: "Texto com Orientações" }],

            [
                { key: k++, type: "RadioButtonInput", label: "Sexo", name: "id_tipo_sexo", apiUrl: "tipo_sexo", validar: ValidacaoBase, mensagemTooltip: "Conforme certidão de nascimento" },
            { key: k++, type: "SelecaoInput", label: "Identidade de Gênero", name: "id_tipo_identidade_genero", apiUrl: "tipo_identidade_genero", onChange: nomeSocial }],
            [{ key: k++,type: "LabelEditarInput", analiseType: "TextoInput", label: "Nome Social", name: "nome_social", validar: SemCaracteresespeciais, mostrarComponente: contexto?.nomeSocial, mensagemTooltip: "Para Somente para pessoas transgêneros  ou transexuais, com documento probatório." }],
            [
                { key: k++, type: "LabelEditarInput", analiseType: "CheckTextoInput", label: "Nome da mãe/Filiação 1", name: "nome_mae", validar: SemCaracteresespeciais },               
                { key: k++, type: "LabelEditarInput", analiseType: "CheckTextoInput", label: "Nome do pai/Filiação 2", name: "nome_pai", validar: SemCaracteresespeciais },
            ],

            [{ key: k++, type: "LabelEditarInput", analiseType: "MascaraInput", label: "CPF", name: "cpf", mask: "cpf", validar: ValidarCpf },
            { key: k++, type: "LabelEditarInput", analiseType: "MascaraInput", label: "Data de Nascimento", name: "data_nascimento", mask: "data", validar: ValidacaoData },],

            [{ key: k++, type: "SelecaoInput", bla: "pais_nascimento", label: "País de Nascimento", name: "id_pais_nascimento", apiSchema: "repo", apiUrl: "pais", onChange: imigrante, validar: ValidacaoBase },
            { key: k++, type: "LabelEditarInput", analiseType: "SelecaoInput", label: "Estado Civil", name: "id_tipo_estado_civil", apiUrl: "tipo_estado_civil", validar: ValidacaoBase },
            ],

            [{ key: k++, type: "SelecaoInput", label: "Raça/Cor", name: "id_tipo_raca_cor", apiUrl: "tipo_raca_cor", validar: ValidacaoBase },
            { key: k++, type: "SelecaoInput", label: "Tipo Sanguíneo", name: "id_tipo_sanguineo", apiUrl: "tipo_sanguineo", validar: ValidacaoBase },
            { key: k++,  type: "LabelEditarInput", analiseType: "MascaraInput", label: "NIT/PIS/PASEP (não obrigatório)", name: "numero_nit_pis_pasep", mask: "pis",mensagemTooltip: "Ao informar o número é necessário anexar o documento comprobatório", validar: ValidarPis },
            ],

            // [
            //     // { key: k++, type: "SimouNaoInput", label: "Possui Deficiência", name: "possui_deficiencia", onChange: possuiDeficiencia },
            //  //   { type: "CheckboxInput", key: 2, label: "Tipo de deficiencia", name: "id_tipo_deficiente", apiUrl: "tipo_deficiente", mostrarComponente: contexto?.possuiDeficiencia, validar: ValidacaoBase },                
            // ],
        ];
    },


}