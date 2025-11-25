import { useEffect, useState } from "react";
import { obtemTodos, obtem, salva, edita, apagaApi } from "../../api/Fakes/FakeApi";
import { FakePessoa } from "../../api/Fakes/services/FakePessoa";
import { FakeBanco } from "../../api/Fakes/services/FakeBanco";

export const FakeMestreContext = (url = "", schema = "repo") => {
  const rota_base = `${schema}/${url}`;

  const fakeJson = (url) => {
    if (url == 'pessoa') {
      return FakePessoa();
    } else if (url == 'banco') {
      return FakeBanco();
    }

  }

  const [data, setData] = useState({
    autorelacionamento: false,
    cabecalho: null,
    item: null,
    itens: null,
    carregando: false,
    apaga: false,
    mensagem: null,
  });

  const setField = (field, value) => {
    setData(prevData => ({ ...prevData, [field]: value }));
  };

  const atualizarResposta = (json, sucesso) => {
    setField(sucesso ? 'item' : 'itens', json);
    setField('carregando', false);
  };

  useEffect(() => {
    if (data.cabecalho !== null) {
      exibirMensagem();
    }
  }, [data.cabecalho]);

  const exibirMensagem = () => {
    let opcoes = {};
    console.log("cabecalho:", data.cabecalho);
    if ((data.cabecalho.status >= 200) && (data.cabecalho.status <= 226)) {
      opcoes = { severity: 'success', life: 3000 };
    }

    if ((data.cabecalho.status >= 400) && (data.cabecalho.status <= 451)) {
      opcoes = { severity: 'warn', life: 6000 };
    }

    if ((data.cabecalho.status >= 500) && (data.cabecalho.status <= 511)) {
      opcoes = { severity: 'danger', life: 6000 };
    }
    setField('mensagem', { severity: opcoes.severity, summary: 'Mensagem', detail: data.cabecalho?.mensagem, life: opcoes.life });
  };

  const requestHandler = async (apiFunc, item = {}, response, callback) => {

    const jsonFake = fakeJson(url);
    console.log('jsonFake', jsonFake);

    console.log('apiFunc', apiFunc);
    console.log('response', response);
    setField('carregando', true);
    const json = apiFunc(item, rota_base, jsonFake);

    console.log("json", json);

    atualizarResposta(json, response);

    if (callback) {
      console.log("funcao de callback ", item.id_pessoa)
      callback(item.id_pessoa);
    }

    return json;
  };

  const obterTodos = async () => {
    
    const jsonFake = fakeJson(url);

    console.log('obterTodosMockado', jsonFake);

    setField('carregando', true);
    const json = obtemTodos(rota_base, jsonFake);

    setField('itens', json);
    setField('carregando', false);
    return json;
  };

  return {
    data,
    obterTodos,
    obter: id => requestHandler(obtem, id, true),
    salvar: item => requestHandler(salva, item, false, obterTodos),
    editar: item => requestHandler(edita, item, true, obterTodos),
    apagar: item => requestHandler(apagaApi, item, false, obterTodos),
    setField,
  };
};