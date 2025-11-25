import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React from 'react';
export default function PerguntaDialog({ titulo = "Confirmação", visible = false, setVisible = false, resposta = null, setResposta = null, children = null, botoes = { rejeita: "Não", aceita: "Sim" } }) {

  const deleteItemDialogFooter = (
    <React.Fragment>
      <Button label={botoes.rejeita} icon="pi pi-times" outlined onClick={() => {setResposta(false); setVisible(false);}} />
      <Button label={botoes.aceita} icon="pi pi-check" severity="danger" onClick={() => {setResposta(true);setVisible(false);}} />
    </React.Fragment>
  );

  return (
    <>
      <Dialog header={titulo} visible={visible} style={{ width: '32rem' }} breakpoints={{ '960px': '175vw', '750px': '105vw' }} onHide={() => setVisible(false)} modal footer={deleteItemDialogFooter} >
        <div>
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {children}

        </div>
      </Dialog>

    </>
  );
}
