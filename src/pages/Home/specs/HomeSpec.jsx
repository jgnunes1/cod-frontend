export const HomeSpec = {
  obter() {
    return [
      {
        titulo: "Cadastros",
        subTitulo: "Gerencie os cadastros principais da Unidade",
        rota_base: "cadastros",
        item: "",
        conteudo: "Acesse os cadastros mestres (cargos, bancos, órgãos emissores, ocupações) e mantenha os dados de referência da Unidade.",
      },
      {
        titulo: "Sobre / Documentação",
        subTitulo: "Informações sobre o sistema e pontos de contato",
        rota_base: "",
        item: "sobre",
        conteudo: "Leia informações sobre o projeto, versão e contatos. Útil para administradores e usuários finais.",
      },
      {
        titulo: "Autenticação / Login",
        subTitulo: "Painel de login do sistema",
        rota_base: "",
        item: "login",
        conteudo: "Acesse a tela de login para obter o token JWT e testar fluxos autenticados no frontend.",
      },
      {
        titulo: "Swagger UI",
        subTitulo: "Documentação interativa da API",
        rota_base: "",
        item: "",
        conteudo: "Abra a documentação interativa para testar endpoints e ver contratos (abre em nova aba).",
        onClick: () => window.open('/swagger-ui/index.html', '_blank'),
      },
      {
        titulo: "OpenAPI (JSON)",
        subTitulo: "Esquema OpenAPI (v3)",
        rota_base: "",
        item: "",
        conteudo: "Obtenha o JSON da especificação OpenAPI (útil para integração e geração de clientes).",
        onClick: () => window.open('/v3/api-docs', '_blank'),
      },
      {
        titulo: "Data Servidor",
        subTitulo: "Dados e horário oficial do servidor",
        rota_base: "",
        item: "",
        conteudo: "Verifique dados do servidor e endpoints públicos (abre em nova aba).",
        onClick: () => window.open('/api/data-servidor', '_blank'),
      },
    ];
  },
};
