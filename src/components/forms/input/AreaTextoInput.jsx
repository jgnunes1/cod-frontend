import React from "react";
import PropTypes from "prop-types";
import { InputTextarea } from "primereact/inputtextarea";

export default function AreaTextoInput({ label, name, type, placeholder, value, onChange, onBlur, error, id, disabled }) {
return (
    <div className="p-fluid" id={id} style={{paddingTop:"1em"}}>
      <label>{label}:</label>
      <InputTextarea 
        disabled={disabled}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={5} cols={60}
      />
      <small> {error && <p>{error}</p>}</small>
    </div>
  );
}

// Definindo as prop types para o componente
AreaTextoInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    error: PropTypes.string,
    id: PropTypes.string,
    disabled: PropTypes.bool
};

// Definindo valores padrões para as props opcionais
AreaTextoInput.defaultProps = {
    type: 'text',
    placeholder: '',
    onBlur: () => {},
    error: '',
    id: '',
    disabled: false
};