import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'primereact/dropdown';
import InfoTooltip from '../InfoTooltip';
import { renderJSON } from '../../json/renderJson';

export default function TipoSexoInput({
    label,
    name,
    value, // Valor inicial: '1' (Masculino) ou '2' (Feminino)
    onChange,
    onBlur,
    id,
    disabled,
    error,
    mensagemTooltip = null,
}) {
    const [selectedValue, setSelectedValue] = useState(null);

    const options = [
        { label: 'Masculino', value: '1' },
        { label: 'Feminino', value: '2' },
    ];

    useEffect(() => {
        console.log(":::: VALUE", value);
        // Garante que o valor inicial é válido e correspondente a uma das opções
        if (value === '1' || value === '2') {
            setSelectedValue(value);
        } else {
            console.warn(`Valor inválido: ${value}. Usando valor padrão '1'.`);
            setSelectedValue('1'); // Valor padrão: Masculino
        }
    }, [value]);

    const handleChange = (e) => {
        const selected = e.value;
        setSelectedValue(selected);
        onChange && onChange({ target: { name, value: selected } });
    };

    return (
        <div className="tipo-sexo-input-wrapper">
            <div className="tipo-sexo-input" id={id}>
                <label className="label">
                    {label} &nbsp;
                    {mensagemTooltip && (
                        <InfoTooltip id={`Tooltip_${name}`} mensagem={mensagemTooltip} />
                    )}
                </label>
                <Dropdown
                    value={selectedValue}
                    options={options}
                    onChange={handleChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    placeholder="Selecione"
                    className="p-dropdown"
                />
                <small className="error-text">{error}</small>
            </div>
            {renderJSON({ value, selectedValue })}
        </div>
    );
}

TipoSexoInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired, // Deve ser '1' ou '2'
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    mensagemTooltip: PropTypes.string,
};

TipoSexoInput.defaultProps = {
    onBlur: () => { },
    id: '',
    disabled: false,
    error: '',
    mensagemTooltip: null,
};
