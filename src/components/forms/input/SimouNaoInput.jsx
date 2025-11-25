import PropTypes from "prop-types";
import React, { useState } from 'react';
import { ToggleButton } from 'primereact/togglebutton';

export default function SimouNaoInput ({ label, name, value, error, id, disabled, onChange, }) {
    const [selectedValue, setSelectedValue] = useState(value); // Default: false (Não)

    const handleChange = (e) => {
        setSelectedValue(e.value);
        if (onChange) {
            onChange(e); 
        }
    };

    return (
        <div className="campo" id={id}>
            <label>{label}:</label>
            <div>
        <ToggleButton
            name={name} 
            checked={selectedValue}
            onChange={handleChange}
            onLabel="Sim"
            offLabel="Não"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            style={{ width: '8rem' }} 
            disabled ={disabled}
        />
        </div>
        <small> {error && <p>{error}</p>}</small>
        </div>
    );
}

// Definindo as prop types para o componente
SimouNaoInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    error: PropTypes.string,
    id: PropTypes.string,
    disabled: PropTypes.bool,
};

// Definindo valores padrões para as props opcionais
SimouNaoInput.defaultProps = {
    type: '',
    value: null, // Define um valor inicial coerente
    placeholder: '',
    error: '',
    id: '',
    disabled: false,
};
