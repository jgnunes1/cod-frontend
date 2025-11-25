import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FileViewDialog from "../components/Dialogs/FileViewDialog";
import Dexie from "dexie";

const db = new Dexie('ArquivosDB');
db.version(1).stores({
    dadosPessoais: 'nome,conteudo'
});

const FileViewIcon = ({ arquivo = "identidade", title = "Identidade", schema = "dadosPessoais", analise = false }) => {
  const [visible, setVisible] = useState(false);
  const [existe, setExiste] = useState(false); // Estado para verificar se o arquivo existe no IndexedDB

  // Verificar se o arquivo existe no IndexedDB
  useEffect(() => {
    const verificarArquivo = async () => {
      try {
        const resultado = await db[schema]?.get(arquivo);
        setExiste(!!resultado); // Define `existe` como true se o arquivo foi encontrado
      } catch (err) {
        console.error(`Erro ao verificar o arquivo "${arquivo}" no IndexedDB:`, err);
        setExiste(false);
      }
    };

    verificarArquivo();
  }, [arquivo, schema]);

  const handleOpenDialog = () => {
    if (existe) {
      setVisible(true);
    } else {
      console.warn(`Arquivo "${arquivo}" não encontrado no IndexedDB.`);
    }
  };

  const handleCloseDialog = () => {
    setVisible(false);
  };

  const color = analise ? "laranja" : "azul";
  const bg = analise ? "laranja-bg-30" : "azul-bg-30";

  return (
    <div>
      <section
        onClick={handleOpenDialog}
        className={bg}
        style={{
          width: "50px",
          borderRadius: "5px",
          cursor: existe ? "pointer" : "not-allowed", // Cursor indica se está disponível
          textAlign: "center",
          paddingTop: "0.5em",
          marginTop: "0.25em",
          opacity: existe ? 1 : 0.3, // Opacidade reduzida para arquivos não encontrados
        }}
        title={existe ? "Clique para visualizar" : "Arquivo não encontrado"} // Tooltip
      >
        <i className={`pi pi-file ${color}`} style={{ fontSize: "1.2rem", margin: "0", padding: "0" }} />
        <div style={{ fontSize: "0.9rem", margin: "0", padding: "0" }}>{title}</div>
      </section>
      {visible && (
        <FileViewDialog
          visible={visible}
          onClose={handleCloseDialog}
          arquivo={arquivo}
          schema={schema}
        />
      )}
    </div>
  );
};

FileViewIcon.propTypes = {
  arquivo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  schema: PropTypes.string,
  analise: PropTypes.bool,
};

export default FileViewIcon;
