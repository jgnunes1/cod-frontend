import PropTypes from "prop-types";
import React, { createContext } from "react";
import { BASE_API_URL, getHeaders } from "../../../configs/Env";


export const CargoContext = createContext({
  itens: [],
  item: null,
  obterTodos: () => {},
  obterLista: () => {},
  obter: () => {},
  salvar: (item) => {},
  editar: (item) => {},
  apagar: (item) => {},
  setItem: (item) => {},
});

const CargoProvider = ({ children }) => {
  const [data, setData] = React.useState({
    itens: null,
    item: null,
    carregando: false,
    mensagem: null,
  });

  const setField = (field, value) => setData(prev => ({ ...prev, [field]: value }));

  const obterTodos = async () => {
    setField('carregando', true);
    try {
      const res = await fetch(`${BASE_API_URL}/cargo`, { method: 'GET', headers: getHeaders() });
      const json = await res.json();
      setField('itens', json?.data || []);
      setField('mensagem', { status: res.status, mensagem: res.headers.get('mensagem') });
      return json;
    } catch (e) {
      console.error('erro listar cargos', e);
    } finally {
      setField('carregando', false);
    }
  };

  const obter = async (id) => {
    if (!id) return null;
    setField('carregando', true);
    try {
      const res = await fetch(`${BASE_API_URL}/cargo/${id}`, { method: 'GET', headers: getHeaders() });
      const json = await res.json();
      setField('item', json?.data || null);
      setField('mensagem', { status: res.status, mensagem: res.headers.get('mensagem') });
      return json;
    } catch (e) {
      console.error('erro obter cargo', e);
    } finally {
      setField('carregando', false);
    }
  };

  const salvar = async (item) => {
    setField('carregando', true);
    try {
      const res = await fetch(`${BASE_API_URL}/cargo`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(item) });
      const json = await res.json();
      setField('mensagem', { status: res.status, mensagem: json?.mensagem || res.headers.get('mensagem') });
      return json;
    } catch (e) {
      console.error('erro salvar cargo', e);
    } finally {
      setField('carregando', false);
      await obterTodos();
    }
  };

  const editar = async (item) => {
    if (!item) return null;
    const id = item.cod_cargo || item.id;
    setField('carregando', true);
    try {
      const res = await fetch(`${BASE_API_URL}/cargo/${id}`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify(item) });
      const json = await res.json();
      setField('mensagem', { status: res.status, mensagem: json?.mensagem || res.headers.get('mensagem') });
      return json;
    } catch (e) {
      console.error('erro editar cargo', e);
    } finally {
      setField('carregando', false);
      await obterTodos();
    }
  };

  const apagar = async (item) => {
    if (!item) return null;
    const id = item.cod_cargo || item.id;
    setField('carregando', true);
    try {
      const res = await fetch(`${BASE_API_URL}/cargo/${id}`, { method: 'DELETE', headers: getHeaders() });
      const json = await res.json();
      setField('mensagem', { status: res.status, mensagem: json?.mensagem || res.headers.get('mensagem') });
      return json;
    } catch (e) {
      console.error('erro apagar cargo', e);
    } finally {
      setField('carregando', false);
      await obterTodos();
    }
  };

  return (
    <CargoContext.Provider
      value={{
        ...data,
        setItem: item => setField('item', item),
        obterTodos,
        obterLista: obterTodos,
        obter,
        salvar,
        editar,
        apagar,
      }}
    >
      {children}
    </CargoContext.Provider>
  );
};

CargoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CargoProvider;
