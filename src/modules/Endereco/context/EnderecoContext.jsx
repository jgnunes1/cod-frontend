import PropTypes from "prop-types";
import React, { createContext, useState } from "react";
import { PorContext } from "../../../contexts/PorContext";

export const EnderecoContext = createContext({
  banco: {},
  Endereco: false,  
  obterTodos: (param) => { },
  obter: () => { },
  salvar: () => { },
  editar: () => { },

});

const EnderecoProvider = ({ children }) => {
  const porContext = PorContext("endereco", "supe");
  const { data, setField, obter, obterPor, onChange, editar, salvar, apagar } = porContext;  
  const [enderecoExterno, setEnderecoExterno] = useState(false);
  const [municipios, setMunicipios] = useState(null);

  
  return (
    <EnderecoContext.Provider
      value={{
        ...data,
        enderecoExterno,
        setEnderecoExterno,
        municipios,
        setMunicipios,
        setItem: item => setField('item', item),
        obter,        
        obterPor,
        onChange,
        editar,
        salvar,
        apagar,
        setApaga: apaga => setField('apaga', apaga),
      }}
    >
      {children}
    </EnderecoContext.Provider>
  );
};

EnderecoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EnderecoProvider;
