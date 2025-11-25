import { Dialog } from "primereact/dialog";
import React, { useState } from "react";

export const AcordeaoHeader = ({ 
  titulo = {descricao:"Título",icone:"pi pi-user"}, 
  retorno = {}

}) => {   

  const estado = { valido: true, quantidade: 0, descricao: "tudo certo" };
  const mais = { valido: true, quantidade: 0, descricao: ["orientações"] };
  const iconeEstadoPendencias =  "pi-check" ;
  const iconeEstadoExigencias = "pi-check" ;

  const [visible, setVisible] = useState({ estado: false, mais: false });

  const openDialog = (dialogName) => {
    setVisible(prev => ({ ...prev, [dialogName]: true }));
  };

  const closeDialog = (dialogName) => {
    setVisible(prev => ({ ...prev, [dialogName]: false }));
  };

  // console.log("RETORNO: ", retorno);

  return (
    <div className="acordeao"  >
      <span  className="flex align-items-center gap-2 w-full "  onClick={(e) => { openDialog('titulo')}}>
        <i className={`pi ${titulo.icone}`}></i>{titulo.descricao}
      </span >
      
      {/* <button  name="bt-a" className="flex align-items-center gap-2" 
              onClick={(e) => {
                e.stopPropagation(); // Impede que o clique suba para o acordeão
                openDialog('estado');
              }}
      >
        <i className={`pi ${iconeEstadoPendencias}`}></i> Pendências: {estado.quantidade}
      </button >
      <button name="bt-b"  className="flex align-items-center gap-2" 
              onClick={(e) => {
                e.stopPropagation(); // Impede que o clique suba para o acordeão
                openDialog('mais');
              }}
      >
        <i className={`pi ${iconeEstadoExigencias}`}></i> Exigências: {mais.quantidade} 
      </button > */}

      <Dialog closable={false} header="Pendências" visible={visible.estado} style={{ width: '50vw' }} onHide={() => closeDialog('estado')}>
      {JSON.stringify(retorno.validacao, null, 2)}
      <hr/>
      <button onClick={(e) => {e.stopPropagation();  closeDialog('estado')}}>ciente</button>
      </Dialog>
      
      <Dialog closable={false} header="Exigências" visible={visible.mais} style={{ width: '50vw' }} onHide={() => closeDialog('mais')}>
      {/* {Array.isArray(mais.descricao) && mais.descricao.map((analise, index) => (
          <p key={index}>{analise}</p>
        ))} */}

        <pre>
          {JSON.stringify(retorno.analise, null, 2)}
        </pre>
        <hr/>
        <button onClick={(e) => {e.stopPropagation();  closeDialog('mais')}}>ciente</button>
      </Dialog>

    </div>
  );
}
