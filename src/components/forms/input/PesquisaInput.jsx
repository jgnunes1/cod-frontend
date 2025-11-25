import React from "react";
import { InputText } from "primereact/inputtext";
import PropTypes from "prop-types";
import { Button } from 'primereact/button';

export default function PesquisaInput({ label = "pesquisar", placeholder = "por nome ou cpf", value, onChange, onBlur, onSearch, dica = "informe o nome ou cpf que deseja encontrar" }) {
  return (
    <div className="d-flex flex-row align-items-center">
      <InputText
      className="m-2"
        name="pesquisa"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        // onKeyPress={onKeyPress} // Adicionando o evento de teclado
        onBlur={onBlur}
      />
      {/* Botão para o modo web */}
      <Button
        className="d-none d-md-inline-flex m-2" // Mostra apenas em telas maiores (>= md)
        label={label}
        onClick={onSearch}
        icon="pi pi-search"
        tooltip={dica}
      />

      {/* Botão para o modo mobile */}
      <Button
        className="d-inline-flex d-md-none m-2" // Mostra apenas em telas menores (< md)
        onClick={onSearch}
        icon="pi pi-search"
        tooltip={dica}
      />
    </div>
  );
}

// Definindo as prop types para o componente
PesquisaInput.propTypes = {
  label: PropTypes.string.isRequired,
  // Remover a obrigatoriedade de 'name'
  name: PropTypes.string,  // Agora é opcional
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  // onKeyPress: PropTypes.func // Definindo o prop para capturar teclas
  onSearch: PropTypes.func, // Prop para a função de busca ao clicar no botão


};


PesquisaInput.defaultProps = {
  name: 'pesquisa',  // Define um valor padrão para name
  type: 'text',
  placeholder: '',
  onBlur: () => { },
  onKeyPress: () => { } // Função padrão para evitar erros caso não seja passada

};
