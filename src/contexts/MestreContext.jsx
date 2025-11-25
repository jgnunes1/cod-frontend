import { obtemTodos, obtemLista } from "../api/MestreApi";
import { BaseContext } from "./BaseContext";

export const MestreContext = (url = "", schema = null) => {
  const baseContext = BaseContext(url, schema);
  const { setField } = baseContext;

  const obterTodos = async () => {
    setField('carregando', true);
    const { url, options } = obtemTodos(baseContext.rota_base);
    const response = await fetch(url, options);
    const json = await response.json();
    setField('cabecalho', { status: response.status, mensagem: response.headers.get('mensagem') });
    setField(response.ok ? 'itens' : 'mensagem', json?.data);
    setField('carregando', false);
    setField('mensagem', { severity: "info", summary: 'Mensagem', detail: response.headers.get('mensagem'), life: 6000});
    return json;
  };

  const obterLista = async () => {
    setField('carregando', true);
    console.log('...chamando lista');
    const { url, options } = obtemLista(baseContext.rota_base);
    const response = await fetch(url, options);
    const json = await response.json();
    setField('cabecalho', { status: response.status, mensagem: response.headers.get('mensagem') });
    setField(response.ok ? 'itens' : 'mensagem', json?.data);
    setField('carregando', false);
    setField('mensagem', { severity: "info", summary: 'Mensagem', detail: response.headers.get('mensagem'), life: 6000});
    return json;
  };

  return {
    ...baseContext,
    obterTodos,
    obterLista,
    salvar: item => baseContext.requestHandler(baseContext.salva, item),
    editar: item => baseContext.requestHandler(baseContext.edita, item ),
    apagar: item => baseContext.requestHandler(baseContext.apagaApi, item),
    // salvar: item => baseContext.requestHandler(baseContext.salva, item, obterTodos),
    // editar: item => baseContext.requestHandler(baseContext.edita, item, obterTodos),
    // apagar: item => baseContext.requestHandler(baseContext.apagaApi, item, obterTodos),
  };
};