import PropTypes from "prop-types";
import React, { createContext } from "react";
import { MestreContext } from "../../../contexts/MestreContext";
import { FakeMestreContext } from "../../../contexts/Fakes/FakeMestreContext";

export const BancosContext = createContext({
  banco: {},
  Banco: false,
  obterTodos: (param) => { },
  obter: () => { },
  salvar: () => { },
  editar: () => { },
});

const BancosProvider = ({ children }) => {
  const mestreContext = FakeMestreContext("banco");
  const { data, setField, obter, obterTodos, onChange, editar, salvar, apagar } = mestreContext;

  return (
    <BancosContext.Provider
      value={{
        ...data,
        setItem: item => setField('item', item),
        obter,
        obterTodos,
        onChange,
        editar,
        salvar,
        apagar,        
        setApaga: apaga => setField('apaga', apaga),
      }}
    >
      {children}
    </BancosContext.Provider>
  );
};

BancosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BancosProvider;
