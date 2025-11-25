import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import HomeView from "../pages/Home/HomeView";
import LoginView from "../pages/Login/LoginView";
import SobreView from "../pages/Sobre/SobreView";
import ServidorView from "../pages/Consulta/ServidorView";
import { AuthContext } from "../contexts/AuthContext";
import CadastrosView from "../pages/Cadastros/CadastrosView";

const Rotas = () => {
  const authContext = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/*" element={<HomeView />} />
      {/* exemplo com autenticação: <Route path="/*" element={ authContext.logado ? <HomeView /> : <LoginView /> } /> */}
       <Route path="/login/*" element={<LoginView />} />   
       <Route path="/cadastros/*" element={ <CadastrosView /> } />  
      <Route path="/sobre/*" element={<SobreView />} />
      <Route path="/servidor/*" element={<ServidorView />} />
    </Routes>
  );
};

export default Rotas;
