import React from 'react';

const RotuloValor = ({ rotulo = null, valor = null, outros = [] }) => {
    return (
        <>
            <div>
                <label className="rotulo-valor">{rotulo || "não informado"}:&nbsp;</label>
                <label>{valor || "não informado"}</label>
            </div>
        </>
    );

};

export default RotuloValor;