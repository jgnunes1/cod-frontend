import { Dropdown } from 'primereact/dropdown';
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { obterTodosOsDados } from '../../../hooks/useDexie';
import InfoTooltip from '../InfoTooltip';

export default function SelecaoInput({
  label,
  name,
  placeholder = 'Selecione',
  value,
  onChange,
  onBlur,
  id,
  disabled = false,
  options = null,
  apiUrl = null,
  error = null,
  mensagemTooltip = null,
}) {
  const [selectedOption, setSelectedOption] = useState(value || null);
  const [internalOptions, setInternalOptions] = useState([]);

  // Carregar opções da API ou da propriedade `options`
  useEffect(() => {

      obterTodosOsDados('ReposTipos', apiUrl)
        .then((registros) => {
          const formattedOptions = registros.map((item) => ({
            key: item.id,
            name: item.nome,
          }));
          setInternalOptions(formattedOptions);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados da API:', error);
        });
    
  }, []);

  // Atualizar valor selecionado quando o `value` mudar
  useEffect(() => {
    setSelectedOption(value || null);
  }, [value]);

  const handleChange = (e) => {
    const selectedValue = e.value;
    setSelectedOption(selectedValue);
    onChange?.({ target: { name, value: selectedValue } });
  };

  const handleBlur = (e) => {
    onBlur?.(e);
  };

  return (
    <div className="p-fluid" id={id} style={{ paddingTop: '1em' }}>
      <label htmlFor={id}>
        {label}
        {mensagemTooltip && (
          <InfoTooltip id={`Tooltip_${name}`} mensagem={mensagemTooltip} />
        )}
      </label>
      <Dropdown
        id={id}
        name={name}
        value={selectedOption}
        options={internalOptions}
        optionLabel="name"
        optionValue="key"
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        filter
        className={error ? 'p-invalid' : ''}
      />
      {error && <small className="p-error">{error}</small>}
    </div>
  );
}

SelecaoInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })
  ),
  apiUrl: PropTypes.string,
  error: PropTypes.string,
  mensagemTooltip: PropTypes.string,
};

SelecaoInput.defaultProps = {
  placeholder: 'Selecione',
  onBlur: () => {},
  error: null,
  id: '',
  disabled: false,
  options: null,
  apiUrl: null,
  mensagemTooltip: null,
};
