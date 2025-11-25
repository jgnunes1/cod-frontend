import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeConsole from './console/HomeConsole';
import FormularioView from './../Formulario/FormularioView';

export default function HomeView() {
  return (
    <>
      <section className='principal'>
        <Routes>
          <Route path="/" element={<HomeConsole />} />    
          <Route path="/formulario/*" element={<FormularioView />} />       
        </Routes>
      </section>
    </>
  );
}