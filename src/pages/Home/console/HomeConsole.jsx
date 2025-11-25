
import React from 'react';
import Cartao from '../../../components/cartoes/Cartao';
import CienteMessage from '../../../components/mensagens/CienteMensagem';
import { HomeSpec } from '../specs/HomeSpec';

export default function HomeConsole() {
    const spec = {};
    spec.homeSpec = HomeSpec.obter();

    return (
        <div className="card">
            <div className="colunas-3">
                {spec.homeSpec && spec.homeSpec.map((item, indice) => (
                    <Cartao
                        key={indice}
                        titulo={item.titulo}
                        subTitulo={item.subTitulo}
                        urlImagem={item.urlImagem}
                        conteudo={item.conteudo}
                        item={item.item}
                        rota_base={item.rota_base}
                        onClick={item.onClick}
                    />
                ))}
            </div>

            <CienteMessage />
        </div>
    );
}

