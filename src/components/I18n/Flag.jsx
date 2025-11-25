import PropTypes from "prop-types";
import React from "react";
import "./Flag.css";

// Componente bem simples que recebe uma imagem
// e se está selecionada ou não (apenas para efeitos visuais)

const Flag = ({ urlImage, isSelected, ...props }) => (
  <img
    alt="flag"
    src={urlImage}
    className={isSelected ? "flag selected" : "flag"}
    {...props}
  />
);

Flag.propTypes = {
  urlImage: PropTypes.string,
  isSelected: PropTypes.bool,
};

export default Flag;
