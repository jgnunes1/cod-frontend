import { useEffect, useState } from "react";
import { obtem, salva, edita, apagaApi } from "../api/BaseApi";
import { use } from "i18next";

export const BaseContext = (url = "", schema = null) => {
  const rota_base = schema ? `${schema}/${url}` : url;
  const [data, setData] = useState({
    autorelacionamento: false,
    cabecalho: null,
    item: null,
    itens: null,
    validacao: null,
    analise: null,
    carregando: false,
    apaga: false,
    mensagem: null,
    _detalhes: null,
  });
  const setField = (field, value) => {
    setData(prevData => ({ ...prevData, [field]: value }));
  };

  const atualizarResposta = (json, response) => {
    if (response.ok) {
      console.log("SUCESSO:", json);
      setField('item', json?.data);
      setField('mensagem', { status: json?.status, mensagem: json?.mensagem });
    } else {
      console.log("FALHA::>",response,json);
      if (response.status == 422){
        setField('mensagem', { status: response.status, mensagem: json?.message, erros:json?.data?.errors });
        return;
      }
      // tratamento de erro
      if (json?.message){
        console.log("......................",json?.errors);
        setField('mensagem', { status: 422, mensagem: json?.message, erros:null});
        return;
      }   
    }
   // setField('carregando', false);
  };

  const requestHandler = async (apiFunc, item = {}, callback) => {
    if (apiFunc == null) return;
    //if (item == null) return;
    setField('mensagem', null);
    setField('carregando', true);
    const { url, options } = apiFunc(item, rota_base);
    let json = null;
    try {
      const response = await fetch(url, options);
      json = await response.json()
      atualizarResposta(json, response);
      if (callback && response.ok) {
        callback();
      }
      return json;
    } catch (error) {
      console.log("falha:", error);
    } finally {
      setField('carregando', false);
    }
  };

  return {
    data,
    rota_base,
    obter: id => requestHandler(obtem, id),
    apagar: item => requestHandler(apagaApi, item),
    salvar: item => requestHandler(salva, item),
    editar: item => requestHandler(edita, item),
    edita,
    salva,
    apagaApi,
    requestHandler,
    setField,
  };
};