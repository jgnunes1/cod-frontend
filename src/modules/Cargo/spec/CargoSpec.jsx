import ValidacaoBase from "../../../components/validacoes/ValidacaoBase";

export const CargoSpec = {
  schema: { id: '', descricao: '', descricaoCompleta: '' },
  console: { titulo: "Cargos", mensagem: "Gestão de cargos" },
  orientacao: { titulo: "Cargos", texto: ["Gerencie os cargos do sistema."] },
  inputs() {
    let k = 1;
    return [
      [
        { type: "TextoInput", key: k++, label: "Nome resumido", name: "nom_resum_cargo", validar: ValidacaoBase },
        { type: "TextoInput", key: k++, label: "Nome completo", name: "nom_compl_cargo", validar: ValidacaoBase },
      ],
      [
        { type: "MascaraInput", key: k++, label: "Data de criação", name: "dat_criacao_cargo", mask: 'data' },
        { type: "TextoInput", key: k++, label: "Tipo", name: "tip_cargo" },
      ],
    ];
  },

  dataTable() {
    return [
      {
        id: "cargo",
        selectionMode: false,
        newMode: true,
        editMode: true,
        deleteMode: true,
        columns: [
          { id: 1, field: "cod_cargo", header: "ID" },
          { id: 2, field: "nom_resum_cargo", header: "Resumo" },
          { id: 3, field: "nom_compl_cargo", header: "Nome Completo" },
        ],
      },
    ];
  },
};

export default CargoSpec;
