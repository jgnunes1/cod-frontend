import React from "react";
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { renderJSON } from "../../../components/json/renderJson";

const ValidarDialog = ({ visible, onClose, status }) => {
  // Filtrar os campos que não são válidos
  const invalidFields = Object.entries(status).filter(([_, value]) => !value.valido);

  return (
    <Dialog
      visible={visible}
      onHide={onClose}
      header="Validação de Campos"
      footer={
        <div>
          <Button label="Fechar" icon="pi pi-times" onClick={onClose} />
        </div>
      }
      modal
      style={{ width: "30%" }} 
      breakpoints={{
        "1200px": "50%", 
        "960px": "70%", 
        "640px": "90%", 
      }}
      draggable={false}
      resizable={false}
    >
      {invalidFields.length === 0 ? (
        <p>Todos os campos passaram pela validação com sucesso.</p>
      ) : (
        <div>
          <section><strong> Atenção:</strong> Verifique todos os campos com o icone <i className="pi pi-times-circle vermelho icon-status-piscante"/>. <br/>Esses campos devem ser preenchidos corretamente.</section>
          <section>
            {/* {invalidFields.map(([key, value]) => (
              <div key={key} style={{ marginBottom: "0.5em" }}>
                <strong>{key}:</strong> {value.mensagem}
              </div>
            ))} */}
          </section>
        </div>
      )}

      {/* {renderJSON(status)} */}
    </Dialog>
  );
};

ValidarDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
};

export default ValidarDialog;
