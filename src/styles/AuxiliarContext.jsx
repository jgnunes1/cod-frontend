import PropTypes from "prop-types";
import React, { createContext } from "react";
import { obtemDados } from "../api/BaseApi";
import useDexie from "../hooks/useDexie";
import useSessionStorage from "../hooks/useSessionStorage";
import useStorage from "../hooks/useStorage";

export const AuxiliarContext = createContext({
    buscarDados: () => { },
    buscarDadosUsuario: () => { },
});

const AuxiliarProvider = ({ children }) => {
    const sessionStorage = useSessionStorage();
    const storage = useStorage();

    async function buscarDados() {

        const databaseName = "ReposTipos";
        const tables = [];

        try {
            const { url, options } = obtemDados("auxiliar");
            const response = await fetch(url, options);
            const data = await response.json();

            for (const [squemaKey, squemaValue] of Object.entries(data?.data)) {
                //console.log(squemaKey, squemaValue);
                for (const [tabelaKey, tabelaValue] of Object.entries(squemaValue)) {
                 // console.log(tabelaKey, tabelaValue);
                    tabelaValue[0] &&
                        tables.push({ name: tabelaKey, schema: Object.keys(tabelaValue[0]).join(','), data: tabelaValue });
                }
            }



        } catch (error) {
            console.error('Erro ao buscar opções:', error);
        }

        // try {

        //     const { url, options } = obtemDados("acl/termo");
        //     const responseTermo = await fetch(url, options);
        //     const termo = await responseTermo.json();

        //     tables.push({ name: "termos", schema: Object.keys(termo.data[0]).join(','), data: Object.values(termo.data) });

        // } catch (error) {
        //     console.error('Erro ao buscar termos:', error);
        // }

        const db = useDexie(databaseName, tables).then(db => {
            // console.log('Banco de dados criado e dados inseridos!');
        })
            .catch(error => {
                console.error("Erro ao criar o banco de dados:", error);
            });

        //console.log('tabelasEschemas', db);

        // Inserir dados como exemplo
        //db.usuarios.add({ nome: 'João', email: 'joao@email.com' });
        // db.produtos.add({ nome: 'Cadeira', preco: 150.00 });
        /*  try {
             const { url, options } = obtemDados("auxiliar");
             const response = await fetch(url, options);
             const data = await response.json();
     
             for (const [squemaKey, squemaValue] of Object.entries(data)) {
                 for (const [tabelaKey, tabelaValue] of Object.entries(squemaValue)) {
                     await addNovaTabela(tabelaKey, Object.keys(tabelaValue[0]).join(','));
                     sessionStorage.salvar(tabelaKey, tabelaValue);
                 }
             }
     
         } catch (error) {
             console.error('Erro ao buscar opções:', error);
         } */
    }

    async function buscarDadosUsuario() {

        try {
            const { url, options } = obtemDados("trabalhador/me");
            const response = await fetch(url, options);
            const trabalhador = await response.json();
            if (response.ok) {
                storage.salvar("usuario_id_formulario", trabalhador?.data?.id_formulario);
                storage.salvar("id_formulario", trabalhador?.data?.id_formulario);
            }

        } catch (error) {
            console.error('Erro ao buscar opções:', error);
        }
    }

    return (
        <AuxiliarContext.Provider
            value={{ buscarDados, buscarDadosUsuario }}    >
            {children}
        </AuxiliarContext.Provider>
    );

}

AuxiliarProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuxiliarProvider;