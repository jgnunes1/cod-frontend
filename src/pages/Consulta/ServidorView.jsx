import React, { useEffect, useMemo, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import * as ServidorApi from "../../api/ServidorApi";

// Página de consulta de Servidor
export default function ServidorView() {
  const [servidores, setServidores] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const toastRef = useRef(null);

  useEffect(() => {
    carregarServidores();
  }, []);

  async function carregarServidores() {
    setLoading(true);
    try {
      const { url, options } = ServidorApi.listarServidores();
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Erro ao buscar servidores: ${response.status}`);
      }

      const data = await response.json();
      // Mapear campos do backend para a tabela frontend
      const servidoresMapeados = data.map((servidor) => ({
        id: servidor.matricula,
        matricula: servidor.matricula,
        nome: servidor.nome,
        codigoOrgaoLotacao: servidor.codigoOrgaoLotacao,
        codigoOrgaoLocalizacao: servidor.codigoOrgaoLocalizacao,
        flagAtividade: servidor.flagAtividade === "S" ? "Ativo" : "Inativo",
        dataAdmissao: servidor.dataAdmissao
          ? new Date(servidor.dataAdmissao).toLocaleDateString("pt-BR")
          : "",
      }));
      setServidores(servidoresMapeados);
      toastRef.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: `${servidoresMapeados.length} servidores carregados`,
      });
    } catch (error) {
      console.error("Erro ao carregar servidores:", error);
      toastRef.current?.show({
        severity: "error",
        summary: "Erro",
        detail: error.message || "Erro ao carregar dados",
      });
      // Fallback: usar dados mock se houver erro
      const mock = [
        {
          id: 1,
          matricula: "12345",
          nome: "João da Silva",
          codigoOrgaoLotacao: "Instituto A",
          codigoOrgaoLocalizacao: "Sala 101",
          flagAtividade: "Ativo",
          dataAdmissao: "01/01/2020",
        },
      ];
      setServidores(mock);
    } finally {
      setLoading(false);
    }
  }

  const header = useMemo(() => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <div className="p-inputgroup">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              placeholder="Pesquisar..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </span>
        </div>
        <div>
          <Button
            label="Recarregar"
            icon="pi pi-refresh"
            className="p-button-sm me-2"
            onClick={carregarServidores}
            loading={loading}
          />
          <Button
            label="Novo"
            icon="pi pi-plus"
            className="p-button-sm p-button-success me-2"
          />
          <Button
            label="Exportar"
            icon="pi pi-file-excel"
            className="p-button-sm p-button-success"
          />
        </div>
      </div>
    );
  }, [globalFilter, loading]);

  return (
    <div className="card">
      <Toast ref={toastRef} />
      <h3>Consulta de Servidores</h3>
      <DataTable
        value={servidores}
        paginator
        rows={10}
        header={header}
        globalFilter={globalFilter}
        emptyMessage="Nenhum servidor encontrado"
        loading={loading}
      >
        <Column field="matricula" header="Matrícula" style={{ width: "12%" }} />
        <Column field="nome" header="Nome" />
        <Column
          field="codigoOrgaoLotacao"
          header="Lotação"
          style={{ width: "15%" }}
        />
        <Column
          field="codigoOrgaoLocalizacao"
          header="Localização"
          style={{ width: "12%" }}
        />
        <Column
          field="flagAtividade"
          header="Status"
          style={{ width: "10%" }}
        />
        <Column
          field="dataAdmissao"
          header="Data de Admissão"
          style={{ width: "12%" }}
        />
      </DataTable>
    </div>
  );
}
