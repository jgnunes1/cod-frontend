import { useEffect, useState } from "react";

const useTemaReactPrime = () => {
  const [tema, setTema] = useState("md-light-indigo");

  // Função para verificar e aplicar o tema baseado no sistema
  const checkSystemTheme = () => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTema(prefersDark ? "md-dark-indigo" : "md-light-indigo");
  };

  useEffect(() => {
    // Checa a preferência inicial do usuário
    checkSystemTheme();

    // Adiciona um listener para mudanças na preferência de esquema de cores
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChangeTema = (e) => {
      setTema(e.matches ? "md-dark-indigo" : "md-light-indigo");
    };

    mediaQuery.addEventListener("change", handleChangeTema);

    // Remove o listener ao desmontar
    return () => {
      mediaQuery.removeEventListener("change", handleChangeTema);
    };
  }, []);

  return [tema, setTema];
};

export default useTemaReactPrime;
