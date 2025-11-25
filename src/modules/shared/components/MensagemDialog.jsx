import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { renderJSON } from "../../../components/json/renderJson";

const MensagemDialog = ({ visible, tipo='201', mensagem, erros=null, onClose }) => {
  const dialogHeader =
    tipo === "201" ? (
      <span><i className="pi pi-verified verde"/>Sucesso</span>
    ) : (
      <span><i className="pi pi-info-circle vermelho"/>Aviso</span>
    );

    const renderErros = () => {
      if (erros && erros.validationErrors) {
        return (
          <div>
                        <hr/>

            <strong>Erros de Validação</strong>
            <ul>
              {Object.entries(erros.validationErrors).map(([campo, mensagens], index) => (
                <section key={index}>
                  {/* <strong>{campo}:</strong> */}
                  <section>
                    {mensagens.map((msg, i) => (
                      <section key={i}>{msg}</section>
                    ))}
                  </section>
                </section>
              ))}
            </ul>
          </div>
        );
      }
      return null;
    };

  const footer = (
    <div>
      <Button label="Fechar" icon="pi pi-check" onClick={onClose} />
    </div>
  );

  return (
    <Dialog
      header={dialogHeader}
      visible={visible}
      style={{ width: "50vw" }}
      modal
      footer={footer}
      onHide={onClose}
    >
      {mensagem}

      {renderErros()}
      
      {/* {renderJSON(erros)} */}
    </Dialog>
  );
};

export default MensagemDialog;
