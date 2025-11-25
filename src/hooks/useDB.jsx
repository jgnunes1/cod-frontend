// useDb.js
import { useState, useEffect } from 'react';
import Dexie from 'dexie';

// Cria o banco de dados
const db = new Dexie('meuBanco');
db.version(1).stores({
  itens: '++id,nome,valor,comprovante',
  compras: '++id,data,valorTotal,id_item',
});

const useDb = () => {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dados = await db.itens.toArray(); // Carrega os dados da tabela 'itens'
        setItens(dados);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    carregarDados();
  }, []);

  const adicionarItem = async (item) => {
    try {
      const id = await db.itens.add(item);
      setItens((prevItens) => [...prevItens, { ...item, id }]);
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  };

  const atualizarItem = async (id, item) => {
    try {
      await db.itens.update(id, item);
      setItens((prevItens) => prevItens.map(i => i.id === id ? { ...i, ...item } : i));
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
    }
  };

  const limparItens = async () => {
    try {
      await db.itens.clear();
      setItens([]);
    } catch (error) {
      console.error('Erro ao limpar itens:', error);
    }
  };

  return { itens, loading, adicionarItem, atualizarItem, limparItens };
};

export default useDb;
