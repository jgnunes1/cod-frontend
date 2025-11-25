import PropTypes from "prop-types";
import React, { createContext } from "react";
import { PorContext } from "../../../contexts/PorContext";

export const GrauInstrucaoContext = createContext({
  banco: {},
  GrauInstrucao: false,
  obterTodos: (param) => { },
  obter: () => { },
  salvar: () => { },
  editar: () => { },
});

const GrauInstrucaoProvider = ({ children }) => {
  const porContext = PorContext("grau_instrucao", "supe");
  const { data, setField, obter, obterPor, onChange, editar, salvar, apagar } = porContext;

  return (
    <GrauInstrucaoContext.Provider
      value={{
        ...data,
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
    </GrauInstrucaoContext.Provider>
  );
};

GrauInstrucaoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GrauInstrucaoProvider;
