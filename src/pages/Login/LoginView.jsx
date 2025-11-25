import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginConsole from "./console/LoginConsole";

export default function LoginView() {
  return (
    <section className="principal login">
      <Routes>
        <Route path="/" element={<LoginConsole />} />
      </Routes>
    </section>
  );
}
