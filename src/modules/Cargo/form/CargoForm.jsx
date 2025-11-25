import React from "react";
import BaseForm from "../../../components/forms/BaseForm";
import CargoSpec from "../spec/CargoSpec";

export default function CargoForm({ spec = CargoSpec, item = null, setItem = null, salvar = null, editar = null, contexto = null, visible = false, setVisible = null }) {

  const handleSubmit = async (e, handleMensagem) => {
    e.preventDefault();
    // simple submit: if has id -> editar else salvar
    if (item && item.cod_cargo) {
      await editar(item);
    } else {
      await salvar(item);
    }
  };

  return (
    <BaseForm
      titulo="Cargo"
      visible={visible}
      setVisible={setVisible}
      valoresFormulario={item}
      setValoresFormulario={setItem}
      handleSubmit={handleSubmit}
      spec={spec}
      contexto={contexto}
      carregando={contexto?.carregando}
    >
    </BaseForm>
  );
}
