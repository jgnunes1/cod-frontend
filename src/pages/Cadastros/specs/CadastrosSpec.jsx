export const CadastrosSpec = {
    obter() {
      return [
        {
          titulo: "Bancos",
          subTitulo: "Gestão de cadastro de Bancos usados pelos Sistemas UERJ",
          rota_base:"cadastros",
          item: "bancos",
          conteudo: "Item usado para cadastrar o bancos brasileiros usados na operações de pagamento e nas declarações governamentais."
        },
        {
          titulo: "Cargos",
          subTitulo: "Gestão de cargos da Unidade (cargo/função)",
          rota_base: "cadastros",
          item: "cargo",
          conteudo: "Criar, editar e remover cargos usados pela Unidade. Sincroniza com o catálogo do backend '/api/cargo'.",
        },
        {
          titulo: "Motivos de Afastamento",
          subTitulo: "Catálogo de motivos para afastamentos e licenças",
          rota_base: "cadastros",
          item: "motivos-afastamento",
          conteudo: "Lista de motivos que podem ser associados a períodos de férias, licenças e afastamentos administrativos.",
        },
        {
          titulo: "CBO / Ocupações",
          subTitulo: "Catálogo de ocupações (CBO)",
          rota_base: "cadastros",
          item: "ocupacoes",
          conteudo: "Catálogo de ocupações para vinculação em cargos e funções (uso em integrações e validações).",
        },
        {
          titulo: "Órgãos Emissores",
          subTitulo: "Órgãos emissores de documentos (RG, CRM, OAB etc.)",
          rota_base: "cadastros",
          item: "orgaos-emissores",
          conteudo: "Gerencie os órgãos emissores de documentos usados nas validações cadastrais.",
        },
        {
          titulo: "Grau de Instrução",
          subTitulo: "Tipos e níveis de grau de instrução",
          rota_base: "cadastros",
          item: "grau_instrucao",
          conteudo: "Catálogo de tipos de grau de instrução (Ensino Médio, Graduação, Pós-graduação).",
        },
        {
          titulo: "Modelos/Template",
          subTitulo: "Modelos e templates usados nos cadastros",
          rota_base: "cadastros",
          item: "modelos",
          conteudo: "Armazena modelos de documentos, templates de formulário e textos padrão usados pela Unidade.",
        },
      ];
    },
  };
  