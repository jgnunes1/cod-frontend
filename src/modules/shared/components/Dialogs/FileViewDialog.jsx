import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import Dexie from "dexie";

const db = new Dexie('ArquivosDB');
db.version(1).stores({
    dadosPessoais: 'nome,conteudo'
});

const FileViewDialog = ({ visible, onClose, arquivo = "identidade", schema = "dadosPessoais" }) => {
  const [fileContent, setFileContent] = useState(null);

  // Buscar o conteúdo do arquivo no IndexedDB quando o diálogo for exibido
  useEffect(() => {
    const fetchFileContent = async () => {
      if (!visible) return;

      try {
        const result = await db[schema]?.get(arquivo);
        if (result && result.conteudo) {
          setFileContent(result.conteudo); // O conteúdo deve ser base64
        } else {
          console.warn(`Arquivo "${arquivo}" não encontrado no IndexedDB.`);
          setFileContent(null);
        }
      } catch (err) {
        console.error(`Erro ao buscar o arquivo "${arquivo}" no IndexedDB:`, err);
        setFileContent(null);
      }
    };

    fetchFileContent();
  }, [arquivo, schema, visible]);

  const pdfSrc = fileContent ? `data:application/pdf;base64,${fileContent}` : null;

  return (
    <Dialog
      visible={visible}
      onHide={onClose}
      header="Visualizar Arquivo"
      modal
      style={{ width: "90vw", height: "90vh" }}
      draggable={false}
      resizable={false}
    >
      {pdfSrc ? (
        <iframe
          src={pdfSrc}
          style={{ width: "100%", height: "100%", border: "none" }}
          title="Visualizador de PDF"
        />
      ) : (
        <div style={{ textAlign: "center", marginTop: "20%" }}>
          <p>O arquivo não pôde ser carregado ou não existe.</p>
        </div>
      )}
    </Dialog>
  );
};

FileViewDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  arquivo: PropTypes.string.isRequired,
  schema: PropTypes.string.isRequired,
};

export default FileViewDialog;
