import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import PropTypes from "prop-types";
import { renderJSON } from "../../json/renderJson";

export default function NomeInput({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  id,
  disabled,
  mensagemTooltip = null,
  outros = null
}) {
  const [exibirNomeSocial, setExibirNomeSocial] = useState(false);
  //const [nomeSocial, setNomeSocial] = useState(outros?.nome_social || "");
  //const [nomes, setNomes] = useState(value || null);

  const handleToggleNomeSocial = () => {
    setExibirNomeSocial(!exibirNomeSocial);
  };
  const handleChange = (e) => {
    
    const name  = e.target.name;
    const valor = e.target.value;
   //console.log("NomeInput.handleChange: ", e.target);
    console.log(name, valor);
    // Atualiza o estado com o campo correto
    const updatedNomes = { ...value, [name]: valor };
    // Dispara a mudança para o pai
    onChange(updatedNomes);
    return updatedNomes;
  };

  const renderNomeReceita = () => {
    if ((value?.nome_receita !== null) && (value?.nome_receita !== value)) {
      return (
        <div className="p-fluid" style={{ paddingTop: "1em" }}>
          <label  className="azul">Nome Receita:</label>
          <section style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{value?.nome_receita}</section>
        </div>
      );
    }
    return null;
  }

  //return (<>{renderJSON(value)}</>);

  return (
    <>
      <div className="p-fluid" id={id} style={{ paddingTop: "0.2em" }}>
        <label>{label}</label>
        <InputText
          disabled={disabled}
          name="nome"
          type={type}
          placeholder={placeholder}
          value={value?.nome}
          onChange={handleChange}
          onBlur={onBlur}
        />
        {error && <small style={{ color: "red" }}>{error}</small>}

        {/* Checkbox para alternar o Nome Social */}
        <div style={{ marginTop: "1em" }}>
          <Checkbox
            inputId="nomeSocialCheckbox"
            checked={exibirNomeSocial}
            onChange={handleToggleNomeSocial}
          />
          <label htmlFor="nomeSocialCheckbox" style={{ marginLeft: "0.5em" }}>
            Informar Nome Social
          </label>
        </div>

        {/* Campo Nome Social */}
        {exibirNomeSocial && (
          <div className="p-fluid" style={{ marginTop: "1em" }}>
            <label style={{ fontWeight: "bold" }}>Nome Social (leia as orientações)</label>
            <InputText
              name="nome_social"
              placeholder="Digite o Nome Social"
              value={value?.nome_social}
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      {renderNomeReceita()}
      <hr />
      {/* {renderJSON(value)} */}
      {/* {renderJSON(nomes)} */}
    </>

  );
}

// Definindo as prop types para o componente
NomeInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  mensagemTooltip: PropTypes.string,
  outros: PropTypes.object, // Objeto contendo campos adicionais

};

// Definindo valores padrões para as props opcionais
NomeInput.defaultProps = {
  type: "text",
  placeholder: "",
  onBlur: () => { },
  error: "",
  id: "",
  disabled: false,
  mensagemTooltip: null,
  outros: null,

};
