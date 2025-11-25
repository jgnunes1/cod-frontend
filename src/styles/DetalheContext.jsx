import { BaseContext } from "./BaseContext";
import { obtemDetalhe, obtemPor } from "../api/DetalheApi";
import { useEffect, useState } from "react";

export const DetalheContext = (url = "", schema = "repo") => {
  const baseContext = BaseContext(url, schema);
  const { setField } = baseContext;
  const [idMestre, setIdMestre] = useState(0);

  const obterDetalhe = async (id_mestre = 0, primeiro = false) => {
    setIdMestre(id_mestre);
    const { url, options } = obtemDetalhe(id_mestre, baseContext.rota_base);
    const response = await fetch(url, options);
    const json = await response.json();
    console.log('JSON:', json);
    if (response.ok) {
      setField('itens', json?.data);
    } else {
      //setField('_detalhes', json?._detalhes);
    }
    return json;
  };
  return {
    ...baseContext,
    obterDetalhe,
    //obterPor,
    salvar: item => baseContext.requestHandler(baseContext.salva, item, () => obterDetalhe(idMestre)),
    editar: item => baseContext.requestHandler(baseContext.edita, item, () => obterDetalhe(idMestre)),
    apagar: item => baseContext.requestHandler(baseContext.apagaApi, item, () => obterDetalhe(idMestre)),
  };
};
