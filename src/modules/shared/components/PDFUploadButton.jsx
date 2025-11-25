import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import Dexie from "dexie";
import VisualizarArquivoSelecionadoDialog from "./VisualizarArquivoSelecionadoDialog";
import IdentidadeArquivoOrientacoes from "../../Pessoa/components/IdentidadeArquivoOrientacoes";
import DeficienciaArquivoOrientacoes from "../../Pessoa/components/DeficienciaArquivoOrientacoes";
import EstrangeiroArquivoOrientacoes from "../../Pessoa/components/EstrangeiroArquivoOrientacoes";
import CPFArquivoOrientacoes from "../../Pessoa/components/CPFArquivoOrientacoes";
import PISArquivoOrientacoes from "../../Pessoa/components/PISArquivoOrientacoes";
import CertidaoArquivoOrientacoes from "../../Pessoa/components/CertidaoArquivoOrientacoes";
import { renderJSON } from "../../../components/json/renderJson";

const db = new Dexie('ArquivosDB');
db.version(1).stores({
  dadosPessoais: 'nome,conteudo',
  grauInstrucao: 'nome,conteudo',
  dependente: 'nome,conteudo'
});

export default function PDFUploadButton({ onChange, obrigatorio = false, nome = "arquivo", rotulo = "Identidade", tabela = "dadosPessoais", extensao = ".pdf", tamanho = "1" }) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);
  const [arquivoSalvo, setArquivoSalvo] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleFileChange = (e) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    const verificarArquivo = async () => {
      try {
        const arquivo = await db[tabela].get(nome);
        setArquivoSalvo(arquivo ? arquivo : null);
      } catch (err) {
        console.error("Erro ao verificar arquivo no IndexedDB:", err);
      }
    };
    verificarArquivo();
  }, [nome, tabela]);

  const onHandleChange = async (event) => {
    const file = event.target.files[0];
    const maxSizeInBytes = tamanho * 1024 * 1024;

    if (file) {
      if (file.size > maxSizeInBytes) {
        setError(`O tamanho do arquivo excede o limite de ${tamanho}MB.`);
        event.target.value = "";
        return;
      } else {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const conteudoBase64 = reader.result.split(',')[1];
          try {
            const objetoSalvar = { nome, conteudo: conteudoBase64 };
            await db[tabela].put(objetoSalvar);
            setArquivoSalvo(objetoSalvar);
          } catch (err) {
            console.error("Erro ao salvar arquivo no IndexedDB:", err);
          }
        };
        reader.readAsDataURL(file);
      }
    }
    //onChange && onChange(arquivoSalvo);
  };

  const estilo = obrigatorio ? "arquivo-obrigatorio" : "arquivo-nao-obrigatorio";
  const renderLegenda = () => {
    const display = !!arquivoSalvo;
    return (<p className="azul" style={{ display: display ? "block" : "none" }} >  existe um  documento ({nome}) selelecionado para comprovação. </p>)
  }

  const limparArquivo = ()=>{
    db[tabela].delete(nome);
    setArquivoSalvo(null);
    // TODO: ver como fica o json principal
  }

  const renderOrientacoes = () => {
    if (nome=="identidade") {
      return <IdentidadeArquivoOrientacoes />
    }
    if (nome=="cpf") {
      return <CPFArquivoOrientacoes />
    }
    if (nome=="pis") {
      return <PISArquivoOrientacoes />
    }
    if (nome=="certidao_casamento") {
      return <CertidaoArquivoOrientacoes />
    }
    if (nome=="deficiencia") {
      return <DeficienciaArquivoOrientacoes />
    }
    if (nome=="estrangeiro") {
      return <EstrangeiroArquivoOrientacoes />
    }
    return null;
  }
  
  return (
    <div style={{ display: "inline-block", minWidth: "200px" }} className={`arquivo-upload-cartao ${estilo}`}>
      {/* {renderJSON({nome, rotulo})} */}
      <input
        ref={fileInputRef}
        type="file"
        accept={extensao}
        onChange={onHandleChange}
        style={{ display: "none" }}
        disabled={!obrigatorio}
      />
      <div>
        <Button
          tooltip={`Selecionar Arquivo ${extensao}`}
          icon="pi pi-file-import"
          onClick={handleFileChange}
          style={{ margin: "0.5em" }}
          disabled={!obrigatorio}
        />
        <Button
          tooltip={`Visualizar Arquivo Selecionado`}
          icon="pi pi-search"
          onClick={(e) => { e.preventDefault(); setDialogVisible(true) }}
          style={{ margin: "0.3em" }}
          disabled={!obrigatorio || !arquivoSalvo}
        />

        <Button
          tooltip={`Limpar Arquivo `}
          icon="pi pi-trash"
          onClick={limparArquivo}
          style={{ margin: "0.3em" }}
          disabled={!obrigatorio || !arquivoSalvo}
        />

      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {renderLegenda()}
      <p className="negrito laranja">utilize esses botões para selecionar e visualizar os documentos</p>

      <VisualizarArquivoSelecionadoDialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        arquivo={arquivoSalvo}
      />

      {renderOrientacoes()}

    </div>
  );
}
