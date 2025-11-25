import React, { useEffect, useState } from "react";
import { InputMask } from "primereact/inputmask";
import PropTypes from "prop-types";
import InfoTooltip from "../InfoTooltip";
import { renderJSON } from "../../json/renderJson";

const MASKS = {
  cep: { mask: "99999-999", placeholder: "99999-999" },
  token: { mask: "****-****", placeholder: "AF3H-I896" },
  cpf: { mask: "999.999.999-99", placeholder: "999.999.999-99" },
  pis: { mask: "999.99999.99-9", placeholder: "999.99999.99-9" },
  cel: { mask: "(99)99999-9999", placeholder: "(99)99999-9999" },
  fixo: { mask: "(99)9999-9999", placeholder: "(99)9999-9999" },
  data: { mask: "99/99/9999", placeholder: "99/99/9999" },
};

export default function MascaraInput({
  label,
  name,
  maskModel,
  value,
  onChange,
  onBlur,
  error,
  id,
  disabled,
  mensagemTooltip = null,
}) {
   const [formattedValue, setFormattedValue] = useState(value);

  useEffect(() => {
    //setFormattedValue(value || "");
  }, []);

  const handleChange = (e) => {
    onChange({ target: { name, value: e.target.value } });
  };

  const { mask, placeholder } = MASKS[maskModel] || {};

  return (
    <div className="p-fluid" id={id} style={{ paddingTop: "1em" }}>
      <label htmlFor={name}>
        {label}
        {mensagemTooltip && (
          <InfoTooltip id={`Tooltip_${name}`} mensagem={mensagemTooltip} />
        )}
      </label>
      <InputMask
        id={name}
        name={name}
        value={value || ""}
        onChange={handleChange}
        mask={mask}
        placeholder={placeholder}
        disabled={disabled}
        className={error ? "p-invalid" : ""}
      />
      {error && <small className="p-error">{error}</small>}
      {/* {renderJSON(value)} */}

    </div>
  );
}

MascaraInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  maskModel: PropTypes.oneOf(Object.keys(MASKS)).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  mensagemTooltip: PropTypes.string,
};

MascaraInput.defaultProps = {
  onBlur: () => {},
  error: "",
  id: "",
  disabled: false,
  mensagemTooltip: null,
};
