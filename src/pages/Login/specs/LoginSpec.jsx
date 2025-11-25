export const LoginSpec = {
  inputs() {
    let k = 1;
    return [
      [
        {
          key: k++,
          id: "cpf",
          label: "ID Único",
          // FIXME alterar o atributo 'name' para ser 'idUnico'
          name: "cpf",
          type: "MascaraInput",
          mask: 'cpf',
        },
      ],
      [
        {
          key: k++,
          id: "password",
          label: "Senha",
          name: "password",
          type: "PasswordInput",
        },
      ],
    ];
  },
};
