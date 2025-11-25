import React from 'react';
import CargoConsole from '../console/CargoConsole';
import CargoProvider from '../context/CargoContext';

export default function CargoSessao() {
  return (
    <>
      <CargoProvider>
        <section className='principal'>
          <CargoConsole />
        </section>
      </CargoProvider>
    </>
  );
}
