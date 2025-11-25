import PropTypes from "prop-types";
import React, { createContext, useState } from "react";
import { DetalheContext } from "../../../contexts/DetalheContext";
import { FakeDetalheContext } from "../../../contexts/Fakes/FakeDetalheContext";

export const TelefoneContext = createContext({
  banco: {},
  Telefone: false,
  obterTodos: (param) => { },
  obter: () => { },
  salvar: () => { },
  editar: () => { },
});

const TelefoneProvider = ({ children }) => {
  const detalheContext = FakeDetalheContext("telefone", "supe"); 
  const { data, setField, obter, obterDetalhe, onChange, editar, salvar, apagar } = detalheContext;
  const [celular, setCelular] = useState(null);

  return (
    <TelefoneContext.Provider
      value={{
        ...data,
        celular,
        setCelular,
        setItem: item => setField('item', item),
        obter,
        obterDetalhe,
        onChange,
        editar,
        salvar,
        apagar,
        setApaga: apaga => setField('apaga', apaga),
      }}
    >
      {children}
    </TelefoneContext.Provider>
  );
};

TelefoneProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TelefoneProvider;
