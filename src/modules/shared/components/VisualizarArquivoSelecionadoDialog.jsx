import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export default function VisualizarArquivoSelecionadoDialog({ visible, onHide, arquivo }) {
  const footer = (
    <div style={{ textAlign: "right" }}>
      <Button label="Fechar" icon="pi pi-times" onClick={onHide} className="p-button-text" />
    </div>
  );

  return (
    <Dialog
      header="Visualizar Arquivo Selecionado"
      visible={visible}
      style={{ width: '80vw', height: '80vh' }}
      onHide={onHide}
      footer={footer}
    >
      {arquivo ? (
        <>
          <section>
            <section className="sublinhado-dotted negrito">Orientações sobre o arquivo:</section>
            <section>
              Essa janela de visualização do arquivo é somente para apresentar o arquivo selecionado em seu dispositivo (computador, tablet ou celular).<br />
              <strong>Atenção:</strong> O arquivo selecionado não foi enviado para análise. Para enviar o arquivo para análise, clique no botão salvar na tela com dados cadastrais.<br />
            </section>
          </section>
          <embed
            src={`data:application/pdf;base64,${arquivo.conteudo}`}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        </>
      ) : (
        <p>Nenhum arquivo disponível para visualização.</p>
      )}
    </Dialog>
  );
}
