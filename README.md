# Projeto base React

## O que é o React?

React é uma biblioteca de JavaScript amplamente utilizada para construir interfaces de usuário interativas e dinâmicas.
Desenvolvida pelo Facebook, React tornou-se uma escolha popular entre desenvolvedores devido à sua eficiência,
simplicidade e capacidade de criação de componentes reutilizáveis. Com sua abordagem baseada em componentes, fluxo de
dados unidirecional e virtual DOM, o React simplifica o desenvolvimento de aplicativos web escaláveis e de alto
desempenho. Ao permitir uma atualização eficiente da interface do usuário em resposta a mudanças de estado, o React
revolucionou a forma como os desenvolvedores constroem aplicações front-end modernas.

## Comando úteis

- criar as redes frontend e backend:

  ```shell
  docker network create laravel_backend; docker network create react_frontend
  ```

  OBS: caso elas já existam, será informado e basta seguir com os próximos passos

- iniciar o projeto

  ```shell
  docker compose up -d node --build
  ```

- Fazer análise de código com lint:

  ```shell
  docker compose run --rm node npm run lint
  ```

- Executar todos os testes (em construção)

  ```shell
  docker compose exec node npx jest
  # para uma única suite de testes:
  #docker compose exec node npx jest src/__tests__/foo/bar.test.jsx
  ```

- instalar novo pacote

  ```shell
  docker compose run --rm node npm install nome-do-pacote
  ```

- instalar novo pacote (apenas para desenvolvimento)

  ```shell
  docker compose run --rm node npm install nome-do-pacote --save-dev
  ```

- Fazer o build do projeto:

  ```shell
  docker compose run --rm node npm run build
  ```

- Exibir o último build (requer build executado):

  ```shell
  docker compose exec node npm run preview-docker
  ```

- Iniciar um server-json para testes de api

  ```shell
  docker compose exec node npm run json-server
  ```

## Sobre os pacotes envolvidos para testes

- **Jest**: É um framework de testes em JavaScript bastante popular e amplamente utilizado para testar código JavaScript, incluindo código React. Ele fornece ferramentas poderosas para escrever testes unitários, testes de integração e testes de componentes.

- **@testing-library/react**: Este é um conjunto de utilitários para testar componentes React. Ele fornece funções para simular interações do usuário e verificar o comportamento resultante dos componentes.

- **@testing-library/jest-dom**: Este é um conjunto de extensões para Jest que fornece funções de correspondência personalizadas para testar o DOM de forma mais eficiente.

- **jest-environment-jsdom**: Este é um ambiente Jest que simula o navegador usando o JSDOM. Ele fornece uma implementação do DOM que pode ser usada em testes sem a necessidade de um navegador real.

- **babel-jest**: Este é um pacote que permite usar o Babel com o Jest para transpilar código JavaScript moderno (como ES6) para JavaScript compatível com versões mais antigas de navegadores, se necessário.

- **setupTests.js**: Este é um arquivo de configuração Jest onde você pode definir configurações globais para seus testes. Ele é especificado na configuração Jest (jest.config.json) para ser executado antes dos testes.

> Babel é um compilador que transforma código JavaScript moderno em uma versão mais antiga compatível com navegadores mais antigos. Ele permite que os desenvolvedores usem recursos mais recentes da linguagem sem se preocupar com compatibilidade.

## Configuração de IDE's (opcional)

### VSCode

Extensões recomendadas no arquivo `.vscode/extensions.json`:

```json
{
  "recommendations": [
    // Formatação automática de código
    "esbenp.prettier-vscode",

    // Idioma e ortografia
    "streetsidesoftware.code-spell-checker",
    "streetsidesoftware.code-spell-checker-portuguese-brazilian",
    "ms-ceintl.vscode-language-pack-pt-br",

    // Visual Studio IntelliCode - suporte IA
    "visualstudioexptteam.vscodeintellicode",

    // Markdown Support for Visual Studio Code - atalhos e recursos para construir documentos
    "yzhang.markdown-all-in-one",

    // Markdown Preview Enhanced - mais recursos de visualização, exportação
    "shd101wyy.markdown-preview-enhanced",

    // Todo Tree - Listar anotações de TODO, FIXME
    "gruntfuggly.todo-tree"
  ]
}
```

Configuração sugeridas no arquivo `.vscode/settings.json`:

```json
{
  // para usar a extensão Prettier como formatador padrão
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // para formatar automaticamente ao salvar
  "editor.formatOnSave": true,

  // para ações ao salvar
  "editor.codeActionsOnSave": {
    //organizar os imports automaticamente
    "source.organizeImports": true
  },

  // para navegar até o diretório do projeto quando se abrir uma aba de terminal
  "terminal.integrated.cwd": "${workspaceFolder}"
}
```

## Links úteis

- Wiki da DEPSEN: <https://git.dgti.uerj.br/depsen/wiki>
- Projeto base Laravel: <https://git.dgti.uerj.br/depsen/laravel-base>
- Projeto base React: <https://git.dgti.uerj.br/depsen/react-base>
- Projeto PHP: <https://git.dgti.uerj.br/depsen/php>
- Projeto Postgres: <https://git.dgti.uerj.br/depsen/postgres>

## Materiais adicionais

- [Curso de React, Matheus Battisti (YouTube)](https://youtube.com/playlist?list=PLnDvRpP8BneyVA0SZ2okm-QBojomniQVO&si=Om9cv6UYxkWieuos)
