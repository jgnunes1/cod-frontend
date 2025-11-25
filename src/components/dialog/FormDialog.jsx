import React from 'react';
import { Dialog } from 'primereact/dialog';
export default function FormDialog({titulo="Sobre o Registro",visible=false,setVisible=false, children=null, style={width:'80vw', height:'80hw' }}){
    return (
        <>
        <Dialog header={titulo} visible={visible} style={style} onHide={() => setVisible(false)}>
            {children}
        </Dialog>

        </>
    );
}
