import { Checkbox } from "primereact/checkbox";
import React, { useState } from "react";
import TextoInput from "./TextoInput";


export default function CheckLabelEditarInput({ label, name, placeholder, value, onChange, onBlur, error, setError, id, disabled}) {

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.checked); // Atualiza o estado com base se está checked ou não
    console.log('cheked?',e.checked);
    if (e.checked) {
      onChange({ target: { name, value: "Não declarado" } }); // Simula uma mudança no input
      const currentErros = error && delete error[name];
      setError(currentErros);
    }else{
      onChange({ target: { name, value: "" } });
    }
  };

  return (
    <>
      {
        <div id={id}>
          {/* <label>{label}</label> */}
          <div >
            <TextoInput
              name={name}
              label={label}
              placeholder={placeholder}
              disabled={isChecked} // Desabilita o input quando o checkbox está checked
              value={value}
              onChange={onChange} // Usa a nova função de mudança
              onBlur={onBlur}
            />
            <div>
            <Checkbox className="me-2"
              tooltip={'Não declarado'}
              name={`${name}`}
              onChange={handleCheckboxChange}
              checked={isChecked}
              disabled={disabled}
            />
            <label>Não declarado</label>
            </div>
          </div>          
          <small>{error && <p>{error}</p>}</small>
        </div>
      }
    </>
  );
}


