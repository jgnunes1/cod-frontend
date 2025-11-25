import React, { useContext } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import useStorage from "../../hooks/useStorage";

export default function MenuPrincipal() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const storage = useStorage();
  const usuario = storage.obter("usuario");

  // Gera uma rota simples a partir do rótulo (slug)
  function slug(label) {
    return label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function navegarPara(item = "") {
    navigate("/" + item);
  }

  function cmd(label) {
    return () => navegarPara(slug(label));
  }

  const items = [
    {
      label: "Cadastro Servidor",
      icon: "pi pi-fw pi-user-edit",
      items: [
        { label: "Frequência", icon: "pi pi-fw pi-calendar", command: cmd("frequencia") },
        { label: "Férias", icon: "pi pi-fw pi-plane", command: cmd("ferias") },
      ],
    },
    {
      label: "Consulta",
      icon: "pi pi-fw pi-search",
      items: [
        { label: "Pessoa", command: cmd("pessoa") },
        { label: "Servidor", command: cmd("servidor") },
        { label: "Apuração do Tempo de Serviço", command: cmd("apuracao-do-tempo-de-servico") },
        {
          label: "Gerencial",
          items: [
            {
              label: "Ocupantes",
              items: [
                { label: "por Perfil", command: cmd("ocupantes-por-perfil") },
                { label: "por Lotação", command: cmd("ocupantes-por-lotacao") },
                { label: "por Localização", command: cmd("ocupantes-por-localizacao") },
              ],
            },
            {
              label: "Quantitativo de Servidores Ativos",
              items: [
                { label: "por Lotação e Perfil", command: cmd("quantitativo-por-lotacao-e-perfil") },
                { label: "por Localização e Perfil", command: cmd("quantitativo-por-localizacao-e-perfil") },
                { label: "por Lotação e Localização", command: cmd("quantitativo-por-lotacao-e-localizacao") },
                { label: "por Pefil e Lotação", command: cmd("quantitativo-por-perfil-e-lotacao") },
                { label: "Docentes", command: cmd("quantitativo-docentes") },
              ],
            },
            {
              label: "Ocupantes com CC/FG",
              items: [
                { label: "por CC/FG", command: cmd("ocupantes-por-ccfg") },
                { label: "por Unidade", command: cmd("ocupantes-por-unidade") },
                { label: "por Servidor", command: cmd("ocupantes-por-servidor") },
                { label: "por Sequencial", command: cmd("ocupantes-por-sequencial") },
                { label: "Todos", command: cmd("ocupantes-todos") },
              ],
            },
            { label: "Perfil", command: cmd("perfil") },
            { label: "Carga Horária por Pefil", command: cmd("carga-horaria-por-perfil") },
            { label: "Férias Pendentes", command: cmd("ferias-pendentes") },
            { label: "Mapa de Férias", command: cmd("mapa-de-ferias") },
            { label: "Mapa de Frequência", command: cmd("mapa-de-frequencia") },
          ],
        },
      ],
    },
    {
      label: "Consultas Básicas",
      icon: "pi pi-fw pi-list",
      items: [
        {
          label: "Registro Profissional",
          items: [
            { label: "Órgão", command: cmd("registro-profissional-orgao") },
            { label: "Registro", command: cmd("registro-profissional-registro") },
          ],
        },
        {
          label: "Perfil",
          items: [
            { label: "Classe Funcional", command: cmd("classe-funcional") },
            { label: "Nivel Salarial", command: cmd("nivel-salarial") },
            { label: "Exigência Complementar", command: cmd("exigencia-complementar") },
            { label: "Período de Férias", command: cmd("periodo-de-ferias") },
            { label: "Cargo", command: cmd("cargo") },
            { label: "Categoria", command: cmd("categoria") },
            { label: "Perfil", command: cmd("perfil-basico") },
            { label: "Especialidade/ Atividade", command: cmd("especialidade-atividade") },
            { label: "Padrão de Vencimento", command: cmd("padrao-de-vencimento") },
            {
              label:
                "Cargo/Categoria/Perfil/Especialidade/Padrão Vencimento (relacionados)",
              command: cmd("cargo-categoria-perfil-especialidade-padrao") ,
            },
          ],
        },
      ],
    },
  ];

  // For small screens, we can expose a compact button that opens a fallback navigation (optional)
  

 
  return (
    <div className="p-2 w-100">
      <Menubar model={items}  />
    </div>
  );
}
