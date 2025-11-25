import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { MestreContext } from "../../../contexts/MestreContext";
import { FormularioContext } from "../../../pages/Formulario/contexto/FomularioContext";
import { FakeMestreContext } from "../../../contexts/Fakes/FakeMestreContext";

export const PessoaContext = createContext({
  banco: {},
  Pessoa: false,
  obterTodos: (param) => { },
  obter: () => { },
  salvar: () => { },
  editar: () => { },
});

const PessoaProvider = ({ children }) => {
  const contextoMestre = useContext(FormularioContext);
  const mestreContext = FakeMestreContext("pessoa", "supe");
  const { data, setField, obter, obterTodos, onChange, editar, salvar, apagar } = mestreContext;
  
  const [possuiFilhos, setPossuiFilhos] = useState(null);
  const [imigrante, setImigrante] = useState(false);
  const [possuiDeficiencia, setPossuiDeficiencia] = useState(null);
  const [condicaoIngresso, setCondicaoIngresso] = useState(null);
  const [validacaoPessoa, setValidacaoPessoa] = useState();


  useEffect(() => {
    contextoMestre?.atualizaDeficiente(possuiDeficiencia);

  }, [possuiDeficiencia]);

  return (
    <PessoaContext.Provider
      value={{
        ...data,
        possuiFilhos,
        setPossuiFilhos,
        imigrante,
        setImigrante,
        possuiDeficiencia,
        setPossuiDeficiencia,
        condicaoIngresso,
        setCondicaoIngresso,
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
    </PessoaContext.Provider>
  );
};

PessoaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PessoaProvider;
