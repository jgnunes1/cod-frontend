import ValidacaoBase from "../../../components/validacoes/ValidacaoBase";
import ValidacaoDataUnix from "../../../components/validacoes/ValidacaoDataUnix";
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
            [
                { key: k++, type: "LabelEditarInput", analiseType: "NomeInput", label: "Nome", name: "nome", validar: SemCaracteresespeciais, arquivo: "identidade", orientacoes: "A alteração do campo nome deve acontecer somente se o seu registro de identidade sofreu alguma alteração. O dado fornecido deve ser idêntico ao que consta no documento apresentado. Caso a informação no campo “Nome Receita” esteja diferente do nome que consta no seu documento, entre em contato com a Receita Federal." }
            ],
            [
                { key: k++, type: "LabelEditarInput", analiseType: "SelecaoInput", label: "Sexo", name: "id_tipo_sexo", apiUrl: "tipo_sexo", validar: ValidacaoBase, mensagemTooltip: "Conforme certidão de nascimento" },
                { key: k++, type: "LabelEditarInput", arquivo: "identidade", idsObrigatorios: [2], analiseType: "SelecaoInput", label: "Identidade de Gênero", name: "id_tipo_identidade_genero", apiUrl: "tipo_identidade_genero", onChange: nomeSocial, orientacoes: "Cisgênero: Pessoas cuja identidade de gênero corresponde ao sexo que foi atribuído a elas ao nascer. Transgênero: Pessoas cuja identidade de gênero não corresponde ao sexo que foi atribuído a elas ao nascer. Não-binário: Pessoas cuja identidade de gênero não se encaixa nas categorias tradicionais de \"homem\" ou \"mulher\". Intersexo – Pessoas que podem possuir características sexuais femininas e masculinas, que não permitem uma referência exata para identificação de gênero." }
            ],
            [
                { key: k++, type: "LabelEditarInput", analiseType: "CheckTextoInput", label: "Nome da mãe/Filiação 1", name: "nome_mae", validar: SemCaracteresespeciais, arquivo: "identidade", orientacoes: "O nome preenchido deve ser idêntico ao que consta no arquivo documento a ser enviado. Só marque a opção “Não declarado” caso seu documento comprove essa informação." },
                { key: k++, type: "LabelEditarInput", analiseType: "CheckTextoInput", label: "Nome do pai/Filiação 2", name: "nome_pai", validar: SemCaracteresespeciais, arquivo: "identidade", orientacoes: "O nome preenchido deve ser idêntico ao que consta no arquivo documento a ser enviado. Só marque a opção “Não declarado” caso seu documento comprove essa informação." }
            ],

            [
                { key: k++, type: "LabelEditarInput", analiseType: "MascaraInput", label: "CPF", name: "cpf", mask: "cpf", arquivo: "cpf", validar: ValidarCpf, orientacoes: "Alerta! Somente altere este campo caso tenha comprovação documental da alteração!" },
                { key: k++, type: "LabelEditarInput", analiseType: "MascaraInput", arquivo: "identidade", label: "Data de Nascimento", name: "data_nascimento", mask: "data", validar: ValidacaoDataUnix },
                { key: k++, type: "LabelEditarInput", analiseType: "SelecaoInput", arquivo: "identidade", label: "País de Nascimento", name: "id_pais_nascimento", apiSchema: "repo", apiUrl: "pais", onChange: imigrante, validar: ValidacaoBase }
            ],

            [
                { key: k++, type: "LabelEditarInput", analiseType: "SelecaoInput", label: "Estado Civil", name: "id_tipo_estado_civil", arquivo: "certidao_casamento", idsObrigatorios: [2, 3], apiUrl: "tipo_estado_civil", validar: ValidacaoBase },
                { key: k++, type: "LabelEditarInput", analiseType: "SelecaoInput", label: "Raça/Cor", name: "id_tipo_raca_cor", apiUrl: "tipo_raca_cor", validar: ValidacaoBase },
                { key: k++, type: "LabelEditarInput", analiseType: "SelecaoInput", label: "Tipo Sanguíneo", name: "id_tipo_sanguineo", apiUrl: "tipo_sanguineo", validar: ValidacaoBase },
            ],

            [
                { key: k++, type: "LabelEditarInput", analiseType: "MascaraInput", label: "Pessoa com Deficiência? (em desenv) ", name: "deficiencias", mensagemTooltip: "Ao informar o número é necessário anexar o documento comprobatório", orientacoes: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum" },
                { key: k++, type: "LabelEditarInput", analiseType: "MascaraInput", label: "É estrangeiro? (em desenv)", name: "estrangeiro", mensagemTooltip: "Ao informar o número é necessário anexar o documento comprobatório", orientacoes: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum" },
                { key: k++, type: "LabelEditarInput", analiseType: "MascaraInput", label: "NIT/PIS/PASEP (não obrigatório)", name: "numero_nit_pis_pasep", mask: "pis", mensagemTooltip: "Ao informar o número é necessário anexar o documento comprobatório", arquivo: "pis", validar: ValidarPis },
            ],

        ];
    },


}