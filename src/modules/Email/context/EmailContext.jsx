import PropTypes from "prop-types";
import React, { createContext } from "react";
import { DetalheContext } from "../../../contexts/DetalheContext";

export const EmailContext = createContext({
  banco: {},
  Email: false,
  obterTodos: (param) => { },
  obter: () => { },
  salvar: () => { },
  editar: () => { },
});

const EmailProvider = ({ children }) => {
  const detalheContext = DetalheContext("email", "supe");
  const { data, setField, obter, obterDetalhe, onChange, editar, salvar, apagar } = detalheContext;

  return (
    <EmailContext.Provider
      value={{
        ...data,
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
    </EmailContext.Provider>
  );
};

EmailProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EmailProvider;
