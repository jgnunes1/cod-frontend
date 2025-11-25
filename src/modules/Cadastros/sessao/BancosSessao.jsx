import React from 'react';
import BancosConsole from '../console/BancosConsole';
import BancosProvider from '../context/BancosContext';


export default function BancosSessao() {
  return (
    <>
      <BancosProvider>
      <section className='principal'>
            <BancosConsole />
      </section>
      </BancosProvider>
    </>
  );
}

