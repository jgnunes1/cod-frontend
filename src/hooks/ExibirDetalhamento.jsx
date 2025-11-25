import { InputMask } from "primereact/inputmask";
import React, { useEffect, useState } from "react";
import RotuloValor from "../components/cartoes/RotuloValor";
import { obterTodosOsDados } from "./useDexie";

// Função para formatar a data no formato dd/mm/yyyy
const formatDate = (dateString) => {
    console.log('dateString', dateString);
    const date = new Date(dateString + 'T00:00:00'); // Força a data para o início do dia
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    console.log(`${day}/${month}/${year}`)
    return `${day}/${month}/${year}`;
};

async function buscarNome(tabela, valor) {
    const registros = await obterTodosOsDados('ReposTipos', tabela);
    const nome = registros.find(item => Number(item.id) === Number(valor))?.nome;
    return nome;
}

function ItemRenderer({ input, json, buscarNome }) {
    const [valorCampo, setValorCampo] = useState("");

    useEffect(() => {
        async function carregarValores() {
            let valor = json[input.name];

            if (valor === true) {
                valor = 'Sim';
            }
            if (valor === false) {
                valor = 'Não';
            }

            if (valor !== null && input.apiUrl) {
                valor = await buscarNome(input.apiUrl, valor);
            }

            if (input.name.includes("data")) {
                valor = valor ? formatDate(valor) : "";
            }

            setValorCampo(valor);
        }

        carregarValores();
    }, [input, json, buscarNome]);

    const telefoneTemplate = (numero, mask) => {
        switch (mask) {
            case "cep":
                return(
                    <InputMask
                    mask="99999-999"
                    value={numero}
                    readOnly
                    className="input-mask-transparent"
                />
                )
    
            case "cpf":
                return(
                    <InputMask
                    mask="999.999.999-99"
                    value={numero}
                    readOnly
                    className="input-mask-transparent"
                />
                )
    
            case "pis":
                return(
                    <InputMask
                    mask="999.99999.99-9"
                    value={numero}
                    readOnly
                    className="input-mask-transparent"
                />
                )
    
            case "cel":
                return(
                    <InputMask
                    mask="(99)99999-9999"
                    value={numero}
                    readOnly
                    className="input-mask-transparent"
                />
                )
    
            case "fixo":
                mask = "(99)9999-9999";
                return(
                    <InputMask
                    mask="(99)9999-9999"
                    value={numero}
                    readOnly
                    className="input-mask-transparent"
                />
                )
    
            default:
                return(numero);
        }
    };

    return (
        <>
            {valorCampo && (
                <RotuloValor
                    rotulo={input.label}
                    valor={
                        input.mask ? telefoneTemplate(valorCampo, input.mask)
                            :
                            valorCampo
                    }
                />
            )}
        </>
    );
}


export default function ExibirDetalhamento({ json = null, spec = null, children = null }) {
    const inputsRenderizados = spec.inputs().map((colunas, colunaIndex) => (
        <div key={colunaIndex} className="linha">
            {colunas.map((input, inputIndex) => (
                <ItemRenderer
                    key={`${colunaIndex}-${inputIndex}`}
                    input={input}
                    json={json}
                    buscarNome={buscarNome}
                />

            ))}
        </div>
    ));

    return (
        <div className="detalhamento-container">
            {inputsRenderizados}
            {children}
        </div>
    );
}
