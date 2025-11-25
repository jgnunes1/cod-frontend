import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo-uerj.svg";
import { APP_NOME_COMPLETO, APP_SIGLA } from "../../configs/Env";
import { AuthContext } from "../../contexts/AuthContext";
import I18n from "../I18n/I18n";
import UsuarioQuadro from "../quadros/UsuarioQuadro";
import { AuxiliarContext } from "../../contexts/AuxiliarContext";
import ToastPadrao from "../toast/ToastPadrao";


function Cabecalho() {
  const menuLeft = useRef(null); // Referência para o menu à esquerda
  const menuRight = useRef(null); // Referência para o menu à direita
  const [toastParams, setToastParams] = useState(null);
  const authContext = useContext(AuthContext);
  const auxiliarContext = useContext(AuxiliarContext);

  auxiliarContext?.buscarDados();

  useEffect(() => {
    authContext.verificarEstaLogado()
    authContext?.logado ? setToastParams({ tipo: 'success', titulo: "Sucesso", mensagem: 'Você esta logado' }) : setToastParams({ tipo: 'warn', titulo: "Logout", mensagem: 'Você não está logado' });
    // console.log("verificando logon");
  }, [authContext.logado]);

  return (
    <header>
      <div className="d-flex px-lg-5 py-lg-2 align-items-center fixed-top text-white shadow-sm cabecalho">

        <div className="p-2 flex-grow-1 align-items-center d-flex flex-row">
          <picture>
            <img src={logo} className="logo" alt="Logo da uerj" />
          </picture>
          <div className="d-flex flex-lg-column align-items-sm-center mx-2 align-items-lg-start">
            <h2 className="my-0">{APP_SIGLA}</h2>
            <p className="d-none d-lg-block text-white-50">{APP_NOME_COMPLETO}</p>
          </div>
        </div>

  {authContext.logado && <UsuarioQuadro />}


        {/* <section className="bandeiras">
           <I18n /> 
        </section>*/}

        {/* {toastParams && (
          <ToastPadrao
            tipo={toastParams.tipo}
            titulo={toastParams.titulo}
            mensagem={toastParams.mensagem}
            position={"bottom-right"}
          />
        )} */}

      </div>
    </header>
  );
}

export default Cabecalho;
