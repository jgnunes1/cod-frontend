import React, { useContext, useState } from "react";
/********** components construídos */
import { AuthContext } from "../../../contexts/AuthContext";
import useProcessaForm from "../../../hooks/useProcessaForm";
import { LoginSpec } from "../specs/LoginSpec";


export default function LoginForm() {
  const [erros, setErros] = useState({});
  const authContext = useContext(AuthContext);

  const spec = {};
  spec.login = LoginSpec.inputs();

  function obterValores(e, item = "login") {
    let array = [].concat.apply([], spec[item]);
    let retorno = {};
    array.forEach((item, i) => (retorno[item.name] = e.target[item.name].value));
    retorno.cpf = retorno.cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    //console.log('retorno', retorno)
    return retorno;
  }

  function logar(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("logar usuário");
    let login = obterValores(event, "login");
    authContext.logar(login);

    return false;
  }


  return (
    <div className="card">
      <form onSubmit={(e) => logar(e)}>
        {/*renderDadosPessoais()*/}
        {spec.login.map((itens) => useProcessaForm({itens, erros, setErros}))}
        <div>
          {authContext?.carregando || <button>login</button>}

          {authContext?.carregando && <div>Carregando...</div>}

        </div>
      </form>
      {authContext?.mensagem && <div className="retorno-login">{authContext?.mensagem}</div>}

    </div>
  );
}
