import React, { useState } from "react";
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import PropTypes from "prop-types";

export default function PasswordInput({ instrucoes = null, label, type, name, placeholder, onChange, onBlur, error, id, disabled, feedback = false }) {

    const [value, setValue] = useState('');

    const header = <div className="font-bold mb-3">{label}</div>;

    const footer = (instrucoes == null ? (
        <>
            <Divider />
            <p className="mt-2">A senha deve conter: </p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>Uma letra maiúscula</li>
                <li>Uma letra minúscula</li>
                <li>Um número</li>
                <li>Mínimo 8 caracteres</li>
            </ul>
        </>
    ) : instrucoes);

    return (
        <div className="p-fluid" id={id} >
            <label>{label}:</label>
            <Password
                name={name}
                value={value}
                onChange={(e) => { setValue(e.target.value); onChange(e) }}
                header={header}
                footer={footer}
                disabled={disabled}
                placeholder={placeholder}
                onBlur={onBlur}
                feedback={feedback}
                toggleMask
                style={{ width: '100%' }}
            />
            <small> {error && <p>{error}</p>}</small>
        </div>
    )
}

// Definindo as prop types para o componente
PasswordInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    error: PropTypes.string,
    id: PropTypes.string,
    disabled: PropTypes.bool
};

// Definindo valores padrões para as props opcionais
PasswordInput.defaultProps = {
    type: 'text',
    placeholder: 'Senha',
    onBlur: () => { },
    error: '',
    id: '',
    disabled: false
};