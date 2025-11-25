import React, { useState } from 'react';
import { Button } from 'primereact/button';

const AnaliseConjuntoDadosOrientacoes = ({ exibirForm = null, setExibirForm = null, documento = null }) => {

    return (
        <>
            <hr />
            <strong>Orientações sobre a análise dos dados do {documento}:</strong>
            <hr />
            <p>
                Você gerou um protocolo para alteração dos dados do <b>{documento}</b>. É possível consultar o andamento
                através do botão <i className="pi pi-receipt" /> <b>"Itens em Análise"</b>.
            </p>
            <p>
                Caso deseje alterar os dados, clique no botão <i className="pi pi-pencil" /> "Editar".
            </p>
            <strong>Importante:</strong>
            <br />
            <section>
                Se o protocolo estiver com status <b>em análise</b>, não será possível editar os dados.
            </section>
            <section>
                Se o protocolo estiver com status <b>aguardando</b> ou <b>em exigência</b>, será possível editar os dados.
            </section>
            <hr />
            <Button
                label="Editar"
                icon="pi pi-pencil"
                onClick={() => setExibirForm((exibirForm) => !exibirForm)}
            />
        </>
    );
};

export default AnaliseConjuntoDadosOrientacoes;
