import { Route, Routes } from "react-router-dom";
import SobreView from "../../pages/Sobre/SobreView";
import LoginView from "../../pages/Login/LoginView";
import React from "react";
import HomeView from "../../pages/Home/HomeView";

const Navbar = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/sobre" element={<SobreView />} />
    </Routes>
  );
};

export default Navbar;
