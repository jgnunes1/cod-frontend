import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FormularioSessao from './sessao/FomularioSessao';


export default function FormularioView() {


  return (
    <>
      <section>
        <Routes>
          <Route path="/" element={<FormularioSessao />} />
        </Routes>
      </section>
    </>
  );
}

