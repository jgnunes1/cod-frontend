import { BaseContext } from "./BaseContext";
import { obtemDetalhe, obtemPor } from "../api/DetalheApi";
import { useEffect, useState } from "react";

export const PorContext = (url = "", schema = "repo") => {
  const baseContext = BaseContext(url, schema);
  const { setField } = baseContext;

  const obterPor = async (coluna = "", id_mestre = 0) => {
    const { url, options } = obtemPor(coluna, id_mestre, baseContext.rota_base);
    const response = await fetch(url, options);
    const json = await response.json();

    if (response.ok) {
      let i = {}

      setField('item', json?.data);
      setField('mensagem', {status:json?.status,mensagem:json?.mensagem});
      // console.log('item', response.headers.get('mensagem'));
      // console.log('mensagem', json?.mensagem);



    } else {
      console.log("FALHA");

    }
    return json;
  };

  return {
    ...baseContext,
   // obterDetalhe,
    obterPor,
    salvar: item => baseContext.requestHandler(baseContext.salva, item),
    editar: item => baseContext.requestHandler(baseContext.edita, item),
    apagar: item => baseContext.requestHandler(baseContext.apagaApi, item),
  };
};
