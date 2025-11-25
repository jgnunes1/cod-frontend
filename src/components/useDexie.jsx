import Dexie from 'dexie';

// Função para criar o banco de dados, esquemas e inserir dados
export default async function useDexie(databaseName, tables) {
  const db = new Dexie(databaseName);

  // Construir o esquema do banco com base nas tabelas fornecidas
  const schema = {};

  // Validação das tabelas
  tables?.forEach((table, index) => {
    if (!table.name || typeof table.name !== 'string') {
      console.error(`Tabela na posição ${index} possui um nome inválido:`, table.name);
      return;
    }
    if (!table.schema || typeof table.schema !== 'string') {
      console.error(`Tabela "${table.name}" possui um schema inválido:`, table.schema);
      return;
    }
    schema[table.name] = table.schema; // Adiciona o esquema da tabela
  });

  if (Object.keys(schema).length === 0) {
    console.error("Nenhuma tabela válida fornecida. O banco de dados não será criado.");
    return null;
  }

  // Define o esquema do banco de dados
  db.version(1).stores(schema);

  try {
    // Transação para garantir que os dados sejam adicionados após a criação das tabelas
    await db.transaction('rw', db.tables, async () => {
      // Para cada tabela, inserir os dados fornecidos
      for (const table of tables) {
        if (table.data && table.data.length > 0) {
          // Verifica se a tabela existe e insere os dados
          const tableRef = db[table.name];
          if (tableRef) {
            await tableRef.bulkPut(table.data);
            //console.log(`Dados inseridos na tabela ${table.name}`);
          } else {
            console.error(`Tabela ${table.name} não encontrada!`);
          }
        }
      }
    });
  } catch (error) {
    console.error("Erro ao inserir dados:", error);
  }

  return db;
}

// Método para deletar um banco de dados
export async function apagandoBancoDados(databaseName) {
  try {
    const db = new Dexie(databaseName);
    await db.delete();
    console.log(`Banco de dados "${databaseName}" deletado com sucesso!`);
  } catch (error) {
    console.error(`Erro ao deletar o banco de dados "${databaseName}":`, error);
  }
}

//Método para deletar todos banco de dados
export async function apagandoTodosBancosDados() {
  try {
    const databases = await Dexie.getDatabaseNames();
    for (const databaseName of databases) {
      const db = new Dexie(databaseName);
      await db.delete();
      console.log(`Banco de dados "${databaseName}" deletado com sucesso!`);
    }
  } catch (error) {
    console.error('Erro ao deletar os bancos de dados:', error);
  }
}


// Método para obter um registro específico pelo ID
export async function obterDadoPeloId(databaseName, tableName, id) {
  try {
    const db = new Dexie(databaseName);
    await db.open();
    const record = await db.table(tableName).get(id);
    //console.log(`Registro encontrado:`, record);
    return record;
  } catch (error) {
    console.error(`Erro ao obter o dado pelo ID ${id}:`, error);
  }
}

// Método para obter dados que atendem a uma condição
export async function obterDadoPorCondicao(databaseName, tableName, field, value) {
  try {
    const db = new Dexie(databaseName);
    await db.open();
    const records = await db.table(tableName)
      .where(field)
      .equals(value)
      .toArray();

    console.log(`Registros encontrados:`, records);
    return records;
  } catch (error) {
    console.error(`Erro ao obter dados da tabela ${tableName} pela condição:`, error);
  }
}

// Método para obter todos os dados de uma tabela
export async function obterTodosOsDados(databaseName, tableName) {
  try {
    const db = new Dexie(databaseName);
    await db.open(); // Certifique-se de abrir o banco de dados antes de acessar as tabelas
    const tableRef = db.table(tableName);
    const records = await tableRef.toArray();
    // console.log(`Todos os registros da tabela ${tableName}:`, records);
    return records;
  } catch (error) {
    console.error(`Erro ao obter todos os dados da tabela ${tableName}:`, error);
  }
}

// Método para obter NOME do campo pelo ID
export function obterNome(databaseName, tableName, id) {
  return obterTodosOsDados(databaseName, tableName).then(registros => {

    const nome = registros.find(item => {
      return Number(item.id) === Number(id);
    }).nome;

    return nome;
  });
}
