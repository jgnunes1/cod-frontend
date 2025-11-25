import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FileViewIcon from "../../shared/components/FileViewIcon";
import Dexie from 'dexie';

const db = new Dexie('ArquivosDB');
db.version(1).stores({
    dadosPessoais: 'nome,conteudo'
});

const ArquivosButton = ({ 
  titulo, 
  analise = false, 
  arquivos = [], 
  descricaoClassName = "sublinhado-dotted negrito", 
  containerStyle = {}, 
  itemStyle = {} 
}) => {
  const [arquivosExistentes, setArquivosExistentes] = useState({});

  useEffect(() => {
    const verificarArquivos = async () => {
      const existentes = {};
      for (const { arquivo } of arquivos) {
        const resultado = await db.dadosPessoais.get(arquivo);
        existentes[arquivo] = !!resultado;
      }
      setArquivosExistentes(existentes);
    };

    verificarArquivos();
  }, [arquivos]);

  if (!arquivos || arquivos.length === 0) return null;

  const icone = analise ? 'pi pi-receipt laranja' : 'pi pi-verified azul';

  const renderizarArquivo = (arquivo, title) => {
    const existe = arquivosExistentes[arquivo];
    return (
      <FileViewIcon
        key={arquivo}
        arquivo={arquivo}
        title={title}
        style={itemStyle}
        analise={analise}
        existe={existe} // Passar a informação para o FileViewIcon
      />
    );
  };

  return (
    <section>
      <section className={descricaoClassName} style={{ marginTop: '0.5em' }}>
        <i className={icone} /> {titulo}
      </section>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', ...containerStyle }}>
        {arquivos.map(({ arquivo, title }) => renderizarArquivo(arquivo, title))}
      </div>
    </section>
  );
};

ArquivosButton.propTypes = {
  titulo: PropTypes.string.isRequired,
  analise: PropTypes.bool,
  arquivos: PropTypes.arrayOf(
    PropTypes.shape({
      arquivo: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  descricaoClassName: PropTypes.string,
  containerStyle: PropTypes.object,
  itemStyle: PropTypes.object
};

export default ArquivosButton;
