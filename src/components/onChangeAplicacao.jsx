import useCep from "./useCep";

export default async function OnChangeAplicacao(name, value, valoresFormulario, setValoresFormulario, contexto, contextoMestre) {

    if (name == 'id_pais_nascimento' && value === 39) {
        setValoresFormulario(
            ({
                ...valoresFormulario,
                ['data_naturalizacao']: null,
                ['numero_decreto_naturalizacao']: null,
                ['data_publicacao_dou_naturalizacao']: null,
                ['numero_registro_estrangeiro']: null,
                ['id_tipo_tempo_residencia_imigrante']: null,
                ['id_tipo_condicao_ingresso_imigrante']: null,
                ['data_chegada_brasil']: null,
                ['casado_com_nacional']: null,
                ['possui_filho_brasileiro']: null,
                ['quantidade_filhos_brasileiros']: null,
            })
        );
    }

    if (name == 'possui_filho_brasileiro' && value === 'S') {
        setValoresFormulario(
            ({
                ...valoresFormulario,
                ['quantidade_filhos_brasileiros']: 1,
            })
        );
    } else if (name == 'possui_filho_brasileiro' && value === 'N') {
        setValoresFormulario(
            ({
                ...valoresFormulario,
                ['quantidade_filhos_brasileiros']: null,
            })
        );
    }

    if (name == 'id_tipo_identidade_genero' && (value !== 2 || value !== 3)) {
        console.log('valoresFormulario', valoresFormulario);
        setValoresFormulario(
            ({
                ...valoresFormulario,
                ['nome_social']: null,
            })
        );
    }

    if (name == 'cep') {
        const endereco = await useCep(value);
        if (endereco != null) {
            console.log('CEP', endereco);

            setValoresFormulario({
                ...valoresFormulario,
                ['cep']: value,
                ['logradouro']: endereco.logradouro,
                ['bairro']: endereco.bairro,
                ['id_municipio']: endereco.id_municipio,
                ['id_uf']: endereco.id_uf,
                ['numero']: null,
                ['complemento']: null,
            });
        } else {
            setValoresFormulario({
                ...valoresFormulario,
                ['cep']: null,
                ['logradouro']: null,
                ['bairro']: null,
                ['id_municipio']: null,
                ['id_uf']: null,
                ['numero']: null,
                ['complemento']: null,
            });
        }

    }

        //Verifica se o valor mudou em relação ao inicial
    if (contexto && contexto?.item !== null) {
        if (value !== contexto?.item[name]) {
            contextoMestre?.atualizaCampos(name, value);
            console.log('handleChange-Diferente-', contextoMestre);

        } else {
            console.log('handleChange-Igual-', contextoMestre);
            delete contextoMestre?.camposAlterados[name]
        }
    }
    /* 
        Opção para inserir o onChange individual de cada campo inserido no spec, 
        caso haja 
        A princípio é utilizado para alterar a variável de contexto que controla 
        a visibilidade de um campo de acordo com a opção escolhida de outro.
    */
}