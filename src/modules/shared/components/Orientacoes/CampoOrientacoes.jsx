import React from 'react';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css'; // Certifique-se de que o PrimeIcons está disponível.

const CampoOrientacoes = ({ titulo="colocar nome amigavel do campo",texto=null }) => {

    const renderTexto = () => {
        if (texto) {
            return (
                <p className="texto-orientacoes">{texto}</p>
            );
        }
        return (
            <p className="texto-orientacoes">Não há orientações para este campo.</p>
        );
    }
  return (
    <>
      <section className="sublinhado-dotted negrito orientacoes">
        <i
          className="pi pi-info-circle azul"
          style={{ fontSize: "1.5em", marginRight: "0.5em" }}
        />
       Orientações sobre o campo:  {titulo}
      </section>
        {renderTexto()}
    </>
  );
};

CampoOrientacoes.propTypes = {
  titulo: PropTypes.string,
  orientacoes: PropTypes.string.isRequired,
};

export default CampoOrientacoes;
