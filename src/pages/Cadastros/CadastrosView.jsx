import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BancosSessao from '../../modules/Cadastros/sessao/BancosSessao';
import CargoSessao from '../../modules/Cargo/sessao/CargoSessao';
import CadastrosConsole from './console/CadastrosConsole';

export default function CadastrosView() {

  return (
    <>
      <section className='principal'>
        <Routes>
          <Route path="/" element={<CadastrosConsole />} />

          <Route path="bancos" element={<BancosSessao />} />
          <Route path="cargo" element={<CargoSessao />} />
        </Routes>
      </section>
    </>
  );
}

