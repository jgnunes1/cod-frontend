import ValidacaoBase from "../../../components/validacoes/ValidacaoBase";
import ValidacaoData from "../../../components/validacoes/ValidacaoData";
import { buscarTipoCondicaoIngresso } from "../form/EstrangeiroForm";

function possuiFilhoBrasileiro(e, contexto) {

    const { name, value } = e.target;
    console.log('contexto', contexto)
    contexto?.setPossuiFilhos(value);
}

async function verificarCondicao(e, contexto) {

    const { value } = e.target;
    const formattedOptions = await buscarTipoCondicaoIngresso(value);
    contexto?.setCondicaoIngresso(formattedOptions);
}

export const EstrangeiroSpec = {
    tabelaArquivo: "estrangeiro",
    inputs(contexto) {
        let k = 1;

        return [
            [{ key: k++, type: "MascaraInput", label: "Data de Naturalização", name: "data_naturalizacao", mask: "data", validar: ValidacaoData },
            { key: k++, type: "TextoInput", label: "Número do Decreto de Naturalização", name: "numero_decreto_naturalizacao", validar: ValidacaoBase },],

            [{ key: k++, type: "MascaraInput", label: "Data de Publicação no DOU", name: "data_publicacao_dou_naturalizacao", mask: "data", validar: ValidacaoData, },
            { key: k++, type: "TextoInput", label: "Número de Registro de Estrangeiro", name: "numero_registro_estrangeiro", validar: ValidacaoBase },
            ],

            [
                { key: k++, type: "TempoResidenciaInput", label: "Tempo de Residência", name: "id_tipo_tempo_residencia_imigrante", apiUrl: "tipo_tempo_residencia_imigrante", onChange: verificarCondicao, validar: ValidacaoBase },
                //  { key: k++, type: "SelecaoInput", label: "Condição de Ingresso", name: "id_tipo_condicao_ingresso_imigrante", options: contexto?.condicaoIngresso, validar: ValidacaoBase },
            ],

            [{ key: k++, type: "SimouNaoInput", label: "Casado com Nacional", name: "casado_com_nacional", validar: ValidacaoBase },
            { key: k++, type: "MascaraInput", label: "Data de Chegada no Brasil", name: "data_chegada_brasil", mask: "data", validar: ValidacaoData },
            { key: k++, type: "PossuiFilhosInput", label: "Possui Filhos Brasileiros?", name: "possui_filhos", validar: ValidacaoBase },
            //      { key: k++, type: "SimouNaoInput", label: "Possui Filho Brasileiro", name: "possui_filho_brasileiro", onChange: possuiFilhoBrasileiro, validar: ValidacaoBase },
            //      {
            //          key: k++, type: "NumeroInput", label: "Quantidade de Filhos Brasileiros", name: "quantidade_filhos_brasileiros",
            //          numberModel: "contInteiro", botoes: true, max: 100, min: 0, mode: "decimal", mostrarComponente: contexto?.possuiFilhos, validar: ValidacaoBase
            //      }
            ],
        ];
    },


}