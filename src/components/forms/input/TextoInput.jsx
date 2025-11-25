import React from "react";
import PropTypes from "prop-types";
import { InputText } from "primereact/inputtext";
import InfoTooltip from "../InfoTooltip";

export default function TextoInput({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  onBlur = () => {},
  error = "",
  id = "",
  disabled = false,
  mensagemTooltip = null,
}) {

  const handleChange = (e) => {
    onChange({ target: { name, value: e.target.value } });
  };
  return (
    <div className="p-fluid" id={id} style={{ paddingTop: "1em" }}>
      <label htmlFor={name}>
        {label}
        {mensagemTooltip && (
          <InfoTooltip id={`Tooltip_${name}`} mensagem={mensagemTooltip} />
        )}
      </label>
      <InputText
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        className={error ? "p-invalid" : ""}
      />
      {error && <small className="p-error">{error}</small>}
    </div>
  );
}

TextoInput.propTypes = {
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
  mensagemTooltip: PropTypes.string,
};

TextoInput.defaultProps = {
  type: "text",
  placeholder: "",
  onBlur: () => {},
  error: "",
  id: "",
  disabled: false,
  mensagemTooltip: null,
};
