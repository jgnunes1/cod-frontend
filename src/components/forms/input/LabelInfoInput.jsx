import { Button } from "primereact/button";
import React, { useState } from "react";
import InfoDialog from "../../dialog/InfoDialog";

export default function LabelInfoInput({ label, name, value, id, orientacoes = null }) {
  const [visible, setVisible] = useState(false);

  const onClick = () => {
    setVisible(true);
  }

  return (
    <>
      {
        <div id={id} className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center flex-grow-1">
            <label className="me-2">{label}:</label>
            <label className="label-texto-input"> <b>{value} </b>

            <i
                id={`button-${id}`}
                //name={name}
                className="pi pi-info-circle azul"
                onClick={onClick}
                style={{ cursor: 'pointer', fontSize: '1.5em', paddingLeft:'.5em' }}
              />
            </label>
          </div>
          <Button type="button" style={{ float: 'right' }} id={`button-${id}`} name={name} icon="pi pi-info-circle" onClick={onClick} />
        </div>
      }

      {
        visible &&
        <InfoDialog
          titulo={'Informações'}
          visible={visible}
          setVisible={setVisible}
        >
          <h4> ******** CAMPO NÃO ALTERAVEL *******</h4>

          <p>{orientacoes}</p>

        </InfoDialog>
      }
    </>
  );
}
