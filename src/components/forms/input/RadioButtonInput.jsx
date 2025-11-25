import { RadioButton } from 'primereact/radiobutton';
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { obterTodosOsDados } from '../../../hooks/useDexie';
import InfoTooltip from '../InfoTooltip';

export default function RadioButtonInput({ options, label, name, value, error, id, disabled, onChange, apiUrl, mensagemTooltip = null }) {

    const [selectedOption, setSelectedOption] = useState(value);
    const [internalOptions, setInternalOptions] = useState([]);

    useEffect(() => {
        if (apiUrl) {

            obterTodosOsDados('ReposTipos', apiUrl).then(registros => {
                //console.log('registros', registros);
                const formattedOptions = registros.map(item => ({
                    key: item.id,
                    name: item.nome
                }));
                //console.log('formattedOptions', formattedOptions);
                setInternalOptions(formattedOptions);
            });
            // Função para buscar dados do SesssionStorage
            // const tabela = sessionStorage.obter(apiUrl);
            // const formattedOptions = Object.values(tabela).map(item => ({
            //     key: item.id,
            //     name: item.nome
            // }));

            // setInternalOptions(formattedOptions);

        } else if (options) {
            // Usar opções fornecidas diretamente
            setInternalOptions(options);
        }
    }, [apiUrl, options]);

    useEffect(() => {
        //console.log('valueeeeee', value);
        setSelectedOption(value === true ? true : value === '' ? false : value);
    }, [value]);

    const handleChange = (e) => {
        const selectedValue = e.value;
        console.log('selectedValue', selectedValue);
        setSelectedOption(selectedValue);

        if (typeof onChange === 'function') {
            onChange({ target: { name, value: selectedValue } });
        }
    };

    return (
        <div className="campo" id={id}>
            <label>{label} &nbsp;
                {mensagemTooltip &&
                    <InfoTooltip
                        id={`Tooltip_${name}`}
                        mensagem={mensagemTooltip}
                    />}
            </label>
            <div className="pergunta-sim-nao">
                {internalOptions.map((option) => {
                    return (
                        <div key={option.key} className="flex align-items-center">
                            <RadioButton
                                inputId={option.key.toString()}
                                name={name}
                                value={option.key}
                                onChange={handleChange}
                                checked={selectedOption === option.key}
                                disabled={disabled}
                            />
                            <label htmlFor={option.key.toString()} className="ml-2">
                                {option.name}
                            </label>
                        </div>
                    );
                })}
            </div>
            <small> {error && <p>{error}</p>}</small>
        </div>
    );
}

// Definindo as prop types para o componente
RadioButtonInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    // value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    error: PropTypes.string,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array.isRequired,
};

// Definindo valores padrões para as props opcionais
RadioButtonInput.defaultProps = {
    type: '',
    value: '',
    placeholder: '',
    error: '',
    id: '',
    disabled: false,
    options: [{ name: 'Sim', key: 1 }, { name: 'Não', key: 2 }],
};