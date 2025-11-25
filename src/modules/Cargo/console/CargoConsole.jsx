import React, { useContext, useEffect, useState } from "react";
import { CargoContext } from "../context/CargoContext";
import CargoForm from "../form/CargoForm";
import CargoSpec from "../spec/CargoSpec";
import BaseConsole from "../../../components/consoles/BaseConsole";
import MestreDataTable from "../../../components/datatable/MestreDataTable";

export default function CargoConsole({ contextoMestre = null }) {
  const contexto = useContext(CargoContext);
  const [formVisible, setFormVisible] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  useEffect(() => {
    contexto?.obterTodos();
  }, []);

  const novo = () => {
    contexto?.setItem({});
    setItemSelecionado(null);
    setFormVisible(true);
  };

  const editar = (item) => {
    contexto?.setItem(item);
    setItemSelecionado(item);
    setFormVisible(true);
  };

  const confirmarApagar = async (item) => {
    if (!item || !item.cod_cargo) return;
    if (window.confirm(`Confirma exclusão do cargo ${item.nom_resum_cargo}?`)) {
      await contexto?.apagar(item);
      contexto?.obterTodos();
    }
  };

  return (
    <>
      <BaseConsole cabecalho={<h3>Cargos</h3>}>
        <MestreDataTable
          spec={CargoSpec}
          value={contexto?.itens}
          novo={novo}
          editar={editar}
          confirmarApagar={confirmarApagar}
        />

        <CargoForm
          spec={CargoSpec}
          item={contexto?.item}
          setItem={contexto?.setItem}
          salvar={contexto?.salvar}
          editar={contexto?.editar}
          contexto={contexto}
          visible={formVisible}
          setVisible={(v) => { setFormVisible(v); contexto?.obterTodos(); }}
        />
      </BaseConsole>
    </>
  );
}
