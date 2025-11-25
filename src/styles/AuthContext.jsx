import PropTypes from "prop-types";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { estaLogado, login, logout } from "../api/Api";
import useSessionStorage from "../hooks/useSessionStorage";
import useStorage from "../hooks/useStorage";
import useToken from "../hooks/useToken";
import { apagandoTodosBancosDados } from "../hooks/useDexie";

//import { use } from "i18next";


export const AuthContext = createContext({
  usuario: {},
  logado: false,
  logar: (param) => { },
  deslogar: () => { },
  verificarEstaLogado: () => { },
  //validarToken: () => {},
});

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState({});
  const [cabecalho, setCabecalho] = useState(false);
  //const [autotizado, setAutorizado] = useState(false);
  const [logado, setLogado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();
  const token = useToken();
  const storage = useStorage();
  const sessionStorage = useSessionStorage();
  const [mensagem, setMensagem] = useState(null);


  async function verificarEstaLogado() {
    const { url, options } = estaLogado();
    const response = await fetch(url, options);
    const json = await response.json();
    //console.log("JSON-VERIFICAR", json);
  
    if (response.ok) {
      setUsuario(json?.data?.usuario);
      setLogado(true);
      return true;
    } else {
      const rotaAtual = window.location.pathname; // Obtém a rota atual
  
      if (rotaAtual === "/primeiro_acesso/" || rotaAtual === "/primeiro_acesso") {
        // Se a rota for "primeiro_acesso", não redirecionar
        setCabecalho(json.cabecalho);
        setLogado(false);
        setUsuario({});
        return false;
      }
  
      // Se não for "primeiro_acesso", redirecionar para login
      navigate("/login");
      setCabecalho(json.cabecalho);
      setLogado(false);
      setUsuario({});
      return false;
    }
  }
  

  async function logar(dados) {
    setCarregando(true);
    setMensagem(null);
    try {
      if (logado) {
        return;
      }
      const { url, options } = login(dados);

      const response = await fetch(url, options);
      const json = await response.json();

      if (response.ok) {
        token.salvar(json?.data?.usuario.token);
        setUsuario(json?.data?.usuario);
        setLogado(true);

        storage.salvar("usuario", json?.data?.usuario);

        navigate("/");
        window.location.reload();
      } else {
        console.log("JSON Logar", json);
        console.log("RESPOSTA Logar", response.headers.get('mensagem'));
        setMensagem(response.headers.get('mensagem'));
      }
    } catch (erro) {
      console.log("ERRO", erro);
    } finally {
      setCarregando(false);
    }

  }

  async function deslogar() {
    // console.log('sair');
    const { url, options } = logout();
    const resposta = await fetch(url, options);
    const json = await resposta.json();
    token.limpar();
    storage.limpar();
    sessionStorage.limpar();
    apagandoTodosBancosDados();
    navigate("/login");
    window.location.reload()
  }


  return (
    <AuthContext.Provider
      value={{ usuario, logado, carregando, mensagem, logar, deslogar, verificarEstaLogado }}    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
