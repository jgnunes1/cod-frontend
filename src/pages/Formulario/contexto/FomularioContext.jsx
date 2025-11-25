import PropTypes from "prop-types";
import React, { createContext, useState } from "react";
import useStorage from "../../../hooks/useStorage";
import { AnaliseMock } from "../mock/AnaliseMock.js";
import { RetornoMock } from "../mock/RetornoMock.js";
import { FakeMestreContext } from "../../../contexts/Fakes/FakeMestreContext";
export const FormularioContext = createContext({ 
  banco: {},
  Formulario: false,
  obterTodos: (param) => { },
  obter: () => { },
  salvar: () => { },
  editar: () => { },
});

const FormularioProvider = ({ children }) => {
  const mestreContext = FakeMestreContext("pessoa", "supe"); 
  const { data, setField, obter, obterTodos, onChange, editar, salvar, apagar } = mestreContext;
  const [camposAlterados, setatualizaCampos] = useState({});
  const [deficiente, setDeficiente] = useState(false);
  const storage = useStorage();
  const [imigrante, setImigrante] = useState(false);
  const id_formulario = storage.obter('id_Formulario');
  const usuario = storage.obter('usuario');
  const [validacaoPessoa, setValidacaoPessoa] = useState(RetornoMock);
  const [analisePessoa, setAnalisePessoa] = useState(AnaliseMock);
  const [validacaoDadoBancario, setValidacaoDadoBancario] = useState([]);
  const [analiseDadoBancario, setAnaliseDadoBancario] = useState([]);

  const atualizaCampos = (name, value) => {
    setatualizaCampos((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const atualizaImigrante = (value) => {
    setImigrante(value);
  };

  const atualizaDeficiente = (value) => {
    setDeficiente(value);
  };

  const retorno = {
    pessoa:
    {

        validacao: validacaoPessoa, 
        setValidacao: setValidacaoPessoa,
        analise: analisePessoa,
        setAnalise: setAnalisePessoa

    },
    dado_bancario:
    {

        validacao: [validacaoDadoBancario, setValidacaoDadoBancario],
        analise: [analiseDadoBancario, setAnaliseDadoBancario] ,
    }
  };

  return (
    <FormularioContext.Provider
      value={{
        imigrante,
        atualizaImigrante,
        deficiente,
        atualizaDeficiente,
        camposAlterados,
        atualizaCampos,
        usuario: usuario,
        id_formulario: 3/* id_Formulario */,
        coluna_mestre: "id_pessoa",
        //coluna_autorelacionamento: "id_responsavel",
        retorno,
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
    </FormularioContext.Provider>
  );
};

FormularioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormularioProvider;
