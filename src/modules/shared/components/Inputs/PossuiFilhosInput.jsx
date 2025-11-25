import PropTypes from "prop-types";
import React, { useState } from "react";
import { ToggleButton } from "primereact/togglebutton";
import { InputNumber } from "primereact/inputnumber";

export default function PossuiFilhoInput({
  label,
  name,
  value,
  numeroDeFilhos,
  error,
  id,
  disabled,
  onChange,
}) {
  const [temFilhos, setTemFilhos] = useState(value || false);
  const [numFilhos, setNumFilhos] = useState(numeroDeFilhos || 0);

  const handleToggleChange = (e) => {
    const novoValor = e.value;
    setTemFilhos(novoValor);
    if (onChange) {
      onChange({ target: { name, value: novoValor } });
    }

    // Resetar o número de filhos caso o valor seja "Não"
    if (!novoValor) {
      setNumFilhos(0);
      onChange({ target: { name: `${name}_numero`, value: 0 } });
    }
  };

  const handleNumFilhosChange = (e) => {
    const novoValor = e.value;
    setNumFilhos(novoValor);
    if (onChange) {
      onChange({ target: { name: `${name}_numero`, value: novoValor } });
    }
  };

  return (
    <div className="campo" id={id}>
      <label>{label}:</label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ToggleButton
          name={name}
          checked={temFilhos}
          onChange={handleToggleChange}
          onLabel="Sim"
          offLabel="Não"
          onIcon="pi pi-check"
          offIcon="pi pi-times"
          style={{ width: "8rem", pointerEvents: "auto" }}
          disabled={disabled}
        />

        {temFilhos && (
          <div style={{ marginLeft: "1rem" }}>
            <label style={{ marginRight: "0.5rem" }}>Quantidade:</label>
            <InputNumber
              name={`${name}_numero`}
              value={numFilhos}
              onValueChange={handleNumFilhosChange}
              min={0}
              maxFractionDigits={0} // Garante que apenas inteiros sejam aceitos
              disabled={disabled}
            />
          </div>
        )}
      </div>

      <small>{error && <p>{error}</p>}</small>
    </div>
  );
}

PossuiFilhoInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool,
  numeroDeFilhos: PropTypes.number,
  error: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

PossuiFilhoInput.defaultProps = {
  value: false,
  numeroDeFilhos: 0,
  error: "",
  id: "",
  disabled: false,
};
