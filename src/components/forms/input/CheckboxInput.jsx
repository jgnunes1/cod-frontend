import { Checkbox } from 'primereact/checkbox';
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useSessionStorage from '../../../hooks/useSessionStorage';
export default function CheckboxInput({ apiUrl, options, label, name, value, error, id, disabled, onChange }) {
    /* const value = "id_tipo_deficiente": [1,2] */

    const [selectedOption, setSelectedOption] = useState(value || []);
    const [internalOptions, setInternalOptions] = useState([]);

    const sessionStorage = useSessionStorage();

    useEffect(() => {
        if (apiUrl) {
            // Função para buscar dados do SesssionStorage
            const tabela = sessionStorage.obter(apiUrl);
            const formattedOptions = Object.values(tabela).map(item => ({
                key: item.id,
                name: item.nome
            }));

            setInternalOptions(formattedOptions);

            // Verifica os ids já selecionados (id_tipo_deficiente)
            // if(value != ''){
            //     const deficienciaIds = value.map(item => item[name]);
            //     setSelectedOption(deficienciaIds);
            // }

        } else if (options) {
            // Usar opções fornecidas diretamente
            setInternalOptions(options);
        }
    }, [apiUrl, options]);

/*     useEffect(() => {
        setSelectedOption(value);
    }, [value]); */

    const onOptionChange = (e) => {
        const { key } = e.value;
        const _selectedOption = e.checked
            ? [...selectedOption, key]
            : selectedOption.filter(option => option !== key);

        setSelectedOption(_selectedOption);

        if (typeof onChange === 'function') {
            onChange({ target: { name, value: _selectedOption } });
        }
    };

    return (
        <div className="campo" id={id}>
            <label>{label}:</label>
            <div className="flex flex-column gap-2">
                {internalOptions.map((option) => {
                    return (
                        <div key={option.key} className="flex align-items-center">
                            <Checkbox
                                inputId={option.key}
                                name={name}
                                value={option}
                                onChange={onOptionChange}
                                // checked={selectedOption === option.key}
                                checked={selectedOption.includes(option.key)}
                                disabled={disabled}
                            />
                            <label htmlFor={option.key} className="ml-2">
                                {option.name}
                            </label>
                        </div>
                    );
                })}
                <small> {error && <p>{error}</p>}</small>
            </div>
        </div>
    );
}

// Definindo as prop types para o componente
CheckboxInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.number,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string]).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    error: PropTypes.string,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array.isRequired,
};

// Definindo valores padrões para as props opcionais
CheckboxInput.defaultProps = {
    type: '',
    value: [],
    placeholder: '',
    error: '',
    id: '',
    disabled: false,
    options: [{ name: 'Opção1', key: '1' }, { name: 'Opção2', key: '2' },]
};