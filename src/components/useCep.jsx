import { obterTodosOsDados } from "./useDexie";
import useSessionStorage from "./useSessionStorage";

const useCep = (cep) => {
    const sessionStorage = useSessionStorage();

    // Verificar se o CEP foi informado
    if (cep) {
        return fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                // Verificar se a resposta da API foi bem-sucedida
                if (!response.ok) {
                    throw new Error("CEP inválido ou não encontrado.");
                }
                return response.json();
            })
            .then(async data => {
                // Verificar se a API retornou erro (campo "erro" existe)
                if (data.erro) {
                    throw new Error("CEP inválido.");
                }

                // Verificar se todos os campos necessários estão presentes na resposta
                if (!data.logradouro || !data.bairro || !data.ibge) {
                    throw new Error("Dados incompletos para o CEP.");
                }

                // Verificar se a tabela de municípios foi carregada corretamente
                const tabela = await obterTodosOsDados('ReposTipos', 'municipio');
                const municipio = Object.values(tabela).find((item) => {
                    return Number(item.codigo) === Number(data.ibge);
                });

                // Verificar se o município foi encontrado na tabela
                if (!municipio) {
                    throw new Error("Município não encontrado.");
                }

                // Retornar os dados do CEP, com todos os campos validados
                return {
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    id_municipio: municipio.id,
                    id_uf: municipio.id_unidade_federativa
                };
            })
            .catch(error => {
                console.error('Erro:', error.message); // Exibe o erro no console
                return null; // Retorna null em caso de erro
            });
    }

    return null; // Caso o cep seja vazio ou inválido
};

export default useCep;
