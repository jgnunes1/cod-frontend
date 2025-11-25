import React from "react";

import logo_dgti from "../../assets/images/dgti.svg";
import {
  APP_CONTATO,
  APP_NOME_COMPLETO,
  APP_SIGLA,
  APP_VERSAO,
} from "../../configs/Env";
import { SobreProvider } from "./context/SobreContext";

export default function SobreView() {
  const contexto = null;
  return (
    <>
      <SobreProvider>
        <section className="principal sobre">
          <h1>{APP_SIGLA} </h1>
          <h2>{APP_NOME_COMPLETO}</h2>
          <img src={logo_dgti} className="logo" alt="Logo da DGTI" />
          <div>
            Versão WEB: {APP_VERSAO} - {contexto?.versao && contexto.versao}{" "}
          </div>
          <div>
            Conectividade com servidor: {contexto?.status && contexto.status}{" "}
          </div>
          <hr />
          contato para suporte: <b>{APP_CONTATO}</b>
        </section>
      </SobreProvider>
    </>
  );
}
