import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React from 'react';

export default function InfoDialog({ titulo = "Informação", visible = false, setVisible = false, children = null,style={width: '32rem'}}) {

  const infoItemDialogFooter = (
    <React.Fragment>
      <Button label={'Ciente'} icon="pi pi-check" outlined onClick={() => setVisible(false)} />
    </React.Fragment>
  );

  return (
    <>
      <Dialog header={titulo} visible={visible} style={style} breakpoints={{ '960px': '175vw', '750px': '105vw' }} onHide={() => setVisible(false)} modal footer={infoItemDialogFooter} >
        <div>
          <i className="pi pi-info-circle mr-3" style={{ fontSize: '1rem' }} />
          {children}
        </div>
      </Dialog>

    </>
  );
}
