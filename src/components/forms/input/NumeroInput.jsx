import React, { useEffect, useState } from "react";
import { InputNumber } from 'primereact/inputnumber';
import PropTypes from "prop-types";

export default function NumeroInput({ label, name, type, numberModel, mode = 'decimal', min, max, placeholder, value, onChange, onBlur, error, id, disabled, botoes }) {
  const [value1, setValue1] = useState(value);

  const handleValueChange = (e) => {
    setValue1(e.value);
    // Disparar o evento onChange manualmente com a estrutura correta
    onChange({ target: { name, value: e.value } });
  };

  useEffect(() => {
    setValue1(value);
  }, [value]);

  const inputProps = {
    disabled,
    name,
    placeholder,
    value: value1,
    onValueChange: handleValueChange,
    onBlur,
    showButtons: botoes,
  };

  if (numberModel === "contInteiro") {
    inputProps.mode = mode;
    inputProps.min = min;
    inputProps.max = max;
  }
  
  inputProps.minFractionDigits = 0;
  inputProps.maxFractionDigits = 0;
  inputProps.useGrouping = false;  // Desativa o agrupamento por vírgulas
  inputProps.locale = "en-US";     // Define o local para garantir sem separadores

  return (
    <div className="campo" id={id}>
      <label>{label}:</label>
      <InputNumber {...inputProps} />
      <small> {error && <p>{error}</p>}</small>
    </div>
  );

}

// Definindo as prop types para o componente
NumeroInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  botoes: PropTypes.bool,
  numberModel: PropTypes.string.isRequired,
  onValueChange: PropTypes.func,
  mode: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number
};

// Definindo valores padrões para as props opcionais
NumeroInput.defaultProps = {
  numberModel: "livre",
  type: 'text',
  placeholder: '',
  onBlur: () => { },
  error: '',
  id: '',
  disabled: false,
  botoes: false,
  onValueChange: () => { },
  mode: '',
  min: 0,
  max: 100
};