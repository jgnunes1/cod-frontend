import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useRef, useState } from "react";
import { FilterMatchMode } from 'primereact/api';
import { MultiSelect } from "primereact/multiselect";

export default function GestaoDataTable({ spec, value=null, acoes = [] }) {

  const campos = spec.dataTable()[0];

  const isSelectable = (data) => data.nome == "Não encontrado" ? false : true;

  const isRowSelectable = (event) => (event.data ? isSelectable(event.data) : true);

  const rowClassName = (data) => (isSelectable(data) ? '' : 'p-disabled');

  const [a, setA] = useState(spec.schema);
  const dt = useRef(null);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nome_avaliado: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nome_avaliador: { value: null, matchMode: FilterMatchMode.CONTAINS },    
    nome_diretor: { value: null, matchMode: FilterMatchMode.CONTAINS },
    chancela: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sig_org: { value: null, matchMode: FilterMatchMode.CONTAINS },
    situacao: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {acoes.buttons.map((acao) => {
          return (
            <Button
              key={acao.id}
              icon={`pi ${acao.icon}`}
              tooltip={acao.dica}
              rounded
              outlined
              className="mr-2"
              onClick={() => acao.handleClick(rowData)}
            />
          );
        }
        )}

      </React.Fragment>
    );
  };

  const statusRowFilterTemplate = (options, statuses) => {
    return (
      <MultiSelect
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        //itemTemplate={statusItemTemplate}
        placeholder="Selecione"
        className="p-column-filter"
        showClear
        //optionLabel="name"
        maxSelectedLabels={1}
        style={{ minWidth: '14rem' }} />
    );
  };

  return (
    <div>
      <div className="card">
        <DataTable
          ref={dt}
          key={campos.id}
          value={value}
          paginator
          rowsPerPageOptions={[5, 10, 25, 50]}
          pageLinkSize={2}
          rows={10}
          resizableColumns
          selectionMode={null}
          isDataSelectable={isRowSelectable}
          rowClassName={rowClassName}
          tableStyle={{ minWidth: '50rem' }}
          filters={filters}
          filterDisplay="row"
          emptyMessage="não encontrado"
        >
          {
            campos.editMode &&
            <Column header="Ações" body={actionBodyTemplate} style={acoes?.style}></Column>
          }
          {
            campos.selectionMode &&
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
          }
          {
            campos.columns.map(
              (item) =>
                <Column
                  key={item.id}
                  field={item.field}
                  header={item.header}
                  sortable
                  filter={item.filterType && true}
                  showFilterMenu={item.filterType == 'dropdown' ? false : true}
                  style={item?.style ? item.style : { minWidth: '12rem' }}
                  filterElement={item.filterType == 'dropdown' && ((options) => statusRowFilterTemplate(options, item.filterList))}
                  body={item.body}

                />
            )
          }
        </DataTable>
      </div>

    </div>
  );
}

{  /* EXEMPLO DO SPEC DO GESTAO DATATABLE UTILIZANDO ICONES
  
  import { iconeChancelaSpec , iconeCienciaSpec, iconeSituacaoSpec, iconeStatusSpec  } from "../../shared/spec/IconesDataTableSpec";

export const GestaoSpec = {
    inputs() {
        return [

        ]
    },

    dataTable() {
        return [
            {
                id: "avaliador",
                selectionMode: false,
                newMode: true,
                editMode: true,
                deleteMode: true,
                columns: [
                    {
                        id: 1,
                        field: "matricula",
                        header: "matrícula",
                        style: { minWidth: "5rem" },

                    },
                    {
                        id: 2,
                        field: "nome_avaliado",
                        header: "avaliado",
                        // filterType:"texto",
                        style: { minWidth: "10rem" },
                        body: iconeCienciaSpec

                    },
                    {
                        id: 3,
                        field: "nome_avaliador",
                        header: "avaliador",
                        // filterType:"texto",
                        style: { minWidth: "10rem" },
                        body: (data)=>iconeSituacaoSpec(data,'nome_avaliador')

                    },
                    {
                        id: 4,
                        field: "nome_diretor",
                        header: "diretor",
                        // filterType:"texto",
                        style: { minWidth: "10rem" },
                        body: iconeChancelaSpec

                    },
   
                    {
                        id: 6,
                        field: "sig_org",
                        header: "Unidade",
                        // filterType:"dropdown",
                        // filterList: ["FAF", "DESENP"]
                        style: { minWidth: "6rem" },

                    },
                    {
                        id: 5,
                        field: "situacao",
                        header: "Situação",
                        body: iconeStatusSpec


                    },
                ],
            },
        ]
    }
}
  */
}