import { PrimeReactProvider } from "primereact/api";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Cabecalho from "./components/layout/Cabecalho";
import MenuPrincipal from "./components/menus/MenuPrincipal";
import Rodape from "./components/layout/Rodape";
import { GlobalProvider } from "./contexts/GlobalContext";
import "./i18n";

import "./App.css";
import AuthProvider from "./contexts/AuthContext";
import Rotas from "./routes/Rotas";
import AuxiliarProvider from "./contexts/AuxiliarContext";

const App = () => {
  const [temaCss, setTemaCss] = useState(() => {
    // Recupera o tema armazenado ou usa um padrão
    return localStorage.getItem("temaCss") || "original";
  });
  const [temaReact, setTemaReact] = useState(() => {
    // Define o tema do PrimeReact com base no tema armazenado
    return localStorage.getItem("temaCss") === "dark" ? "md-dark-indigo" : "md-light-indigo";
  });

  const temasCss = [
    { label: "Original", value: "original" },
    { label: "Dark", value: "dark" },
    { label: "Laranja", value: "laranja" },
    { label: "Verde", value: "verde" },
  ];

  useEffect(() => {
    // Aplica o tema selecionado adicionando a classe ao body
    document.body.className = ""; // Limpa qualquer classe anterior
    document.body.classList.add(temaCss);

    // Define o tema do PrimeReact dinamicamente
    if (temaCss === "dark") {
      setTemaReact("md-dark-indigo");
    } else {
      setTemaReact("md-light-indigo");
    }

    // Armazena o tema selecionado no localStorage
    localStorage.setItem("temaCss", temaCss);
  }, [temaCss]);

  useEffect(() => {
    // Atualiza dinamicamente o tema do PrimeReact
    const linkElement = document.getElementById("theme-link");

    if (linkElement) {
        const newHref = `https://unpkg.com/primereact/resources/themes/${temaReact}/theme.css?v=${Date.now()}`;

        // Atualiza o href somente se for diferente para evitar recarregamentos desnecessários
        if (linkElement.href !== newHref) {
            linkElement.href = newHref;
        }
    } else {
        // Se o elemento não existe, cria um novo
        const newLinkElement = document.createElement("link");
        newLinkElement.id = "theme-link";
        newLinkElement.rel = "stylesheet";

        // Adiciona a versão para evitar cache
        newLinkElement.href = `https://unpkg.com/primereact/resources/themes/${temaReact}/theme.css?v=${Date.now()}`;

        document.head.appendChild(newLinkElement);
    }

    console.log("temaReact atualizado para:", temaReact);
}, [temaReact]);


  return (
    <BrowserRouter>
      <link
        id="theme-link"
        rel="stylesheet"
        href={`https://unpkg.com/primereact/resources/themes/${temaReact}/theme.css`}
      />
      <GlobalProvider>
        <AuthProvider>
          <AuxiliarProvider>
            <PrimeReactProvider>
              <Cabecalho />
              <main>
                <div className="container-fluid position-absolute main_config">
                  <div className="container mt-5 p-lg-5  mb-5 rounded-3">
                    {/* Menu principal dentro da área branca, visível abaixo do cabeçalho */}
                    <div style={{ background: 'transparent', marginBottom: '1rem', marginTop: '57px' }}>
                      <MenuPrincipal />
                    </div>
                    <Rotas />
                  </div>
                </div>
              </main>
              <Rodape
                temasCss={temasCss}
                temaCss={temaCss}
                setTemaCss={setTemaCss}
              />
            </PrimeReactProvider>
          </AuxiliarProvider>
        </AuthProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
};

export default App;
