import React from "react";

export default function IdentidadeArquivoOrientacoes() {
  return (
    <div>
      <section className="sublinhado-dotted negrito orientacoes">
        <i className="pi pi-info-circle azul" style={{ fontSize: "1.5em", marginRight: "0.5em" }} />
        Orientações sobre o envio do documento de identidade:
      </section>
      <p className="texto-orientacoes">
        Para alterar este campo, é necessário anexar o documento de identidade. O arquivo será analisado pela equipe responsável e, após aprovação, ficará disponível para consulta. Antes de clicar em <strong>Salvar</strong>, utilize o botão com o ícone <i className="pi pi-file-import" /> para selecionar o arquivo. 
        Certifique-se de que:
      </p>
      <p className="texto-orientacoes">
        Após selecionar o arquivo, você pode visualizá-lo clicando no botão com o ícone <i className="pi pi-search" />. Lembre-se de que o envio do documento não resulta em alteração automática; ele será analisado antes da aprovação.
      </p>
      <p className="texto-orientacoes">
        <strong>Importante:</strong> Os campos <b>Nome do Pai</b>, <b>Nome da Mãe</b>, <b>Data de Nascimento</b> e <b>Nome Social</b> também exigem o documento de identidade como comprovante. Caso precise alterar algum desses campos, verifique se o documento já está acessível na respectiva janela, que também conta com o botão de visualização <i className="pi pi-search" />.
      </p>
      <p className="texto-orientacoes">
        Caso encontre dificuldades no envio ou tenha dúvidas, entre em contato com o suporte técnico.
      </p>
    </div>
  );
}
