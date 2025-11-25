import React from "react";
import { OBTER_CONEXAO } from "../api/SobreApi";

export const SobreContext = React.createContext();

export const SobreProvider = ({ children }) => {
  const [evento, setEvento] = React.useState(null);

  async function obterEvento() {
    const { url, options } = OBTER_CONEXAO(evento);
    const response = await fetch(url, options);
    const Sobre = await response.Sobre();
    // tratar retorno aqui
    console.log(Sobre);
    setEvento(Sobre.corpo);
  }

  React.useEffect(() => {
    //obterEvento();
  }, []);

  return (
    <SobreContext.Provider
      value={{
        evento,
        setEvento,
        obterEvento,
      }}
    >
      {children}
    </SobreContext.Provider>
  );
};
