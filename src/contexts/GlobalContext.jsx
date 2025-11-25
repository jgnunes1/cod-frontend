import PropTypes from "prop-types";
import {verificaConexo} from "../api/GlobalApiExemplo";
import { createContext, useEffect, useState } from "react";
import { set } from "react-hook-form";
//import { AuthContext } from "./AuthContext";

export const GlobalContext = createContext({
  //conexao: {cabecalho: {status: "offline"}},
  //authContext: AuthContext,
});

export const GlobalProvider = ({ children }) => {
  const [onLine, setOnLine] = useState(false);
  const [corpo, setCorpo] = useState(null);

  const verificarConexao = async () => {
    //console.log('verificando conexao');
    const { url, options } = verificaConexo();
    const response = await fetch(url, options);
    const json = await response.json();
    //console.log('resultado conexao:', json);
    if (response.ok){
      setOnLine(true);
      setCorpo(json);
    }
    //console.log('cabecalho conexao:', response.headers.get('mensagem'));
    return json;
  };

  useEffect(() => {
    verificarConexao();
  },[]);


  return (
    <GlobalContext.Provider
      value={{
        onLine,
        corpo,
        //authContext: AuthContext,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
