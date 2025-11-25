import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';



export default function MestreDataTable({ spec, value, novo=null, editar = null, confirmarApagar=null,item=null,setItem=null,selectedItems = null, setSelectedItems = null }) {
  //console.log(inputs);// renderizando os datatables de pessoa ???
  const inputs = spec.inputs();
  const campos = spec.dataTable()[0];

  const isSelectable = (data) => data.nome == "Não encontrado" ? false : true;

  const isRowSelectable = (event) => (event.data ? isSelectable(event.data) : true);

  const rowClassName = (data) => (isSelectable(data) ? '' : 'p-disabled');

  //let itemVazio ={id:'',codigo:'',nome:'',indice:''};

  const [deleteItemDialog, setDeleteItemDialog] = useState(false);
  const [itemDialog, setItemDialog] = useState(false);
  const [a, setA] = useState(spec.schema);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nome: { value: null, matchMode: FilterMatchMode.CONTAINS },
    descricao: { value: null, matchMode: FilterMatchMode.CONTAINS },
});


  const saveItem = (e) => {
    e.preventDefault();
    setSubmitted(true);    
    console.log("clicou em saveItem");
  };

  const editItem = (item) => {
    console.log("edititem",item);
    editar(item);
  };


  const deleteItem = () => {
    console.log("deleteItem",item);
    apagar(item);
    setDeleteItemDialog(false);
    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Item Deletado!', life: 3000 });
  };

  const hideDeleteItemDialog = () => {
    setDeleteItemDialog(false);
  };


  const hideDialog = () => {
    setSubmitted(false);
    setItemDialog(false);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editItem(rowData)} />
        {
          campos.deleteMode &&
          <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmarApagar(rowData)} />
        }
      </React.Fragment>
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="Novo " icon="pi pi-plus" severity="success" onClick={novo} />
      </div>
    );
  };

  const deleteItemDialogFooter = (
    <React.Fragment>
      <Button label="Não" icon="pi pi-times" outlined onClick={hideDeleteItemDialog} />
      <Button label="Sim" icon="pi pi-check" severity="danger" onClick={deleteItem} />
    </React.Fragment>
  );


  const renderHeader = () => {
    return (
        <div className="pesquisar">
                 {novo && <Button label="Novo " icon="pi pi-plus" severity="success" onClick={novo} />}

            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="pesquisar" />
            </IconField>
        </div>
    );
};

const onGlobalFilterChange = (e) => {

  const value = e.target.value;
  let _filters = { ...filters };
  _filters['global'].value = value;
  setFilters(_filters);
  setGlobalFilterValue(value);
};



const header = renderHeader();

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        {/*
          campos.newMode &&
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
  */}
        <DataTable
          ref={dt}
          key={campos.id}
          value={value}
          paginator
          rows={10}
          resizableColumns
          selectionMode={null}
          selection={selectedItems}
          onSelectionChange={(e) => setSelectedItems(e.value)}
          isDataSelectable={isRowSelectable}
          rowClassName={rowClassName}
          tableStyle={{ minWidth: '50rem' }}
          header={header}
          filters={filters}
          emptyMessage="não encontrado"
        >
          {
            campos.editMode &&
            <Column header="Ações" body={actionBodyTemplate} style={{ minWidth: '12rem' }}></Column>
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
                  filter
                  style={{ width: "25%", maxWidth: "600px", whiteSpace: 'pre-wrap' }} // TODO: trabalhar isso no spec de cada entidade

                  >
                </Column>
            )
          }
        </DataTable>
      </div>

      {/*deletar*/}
      <Dialog visible={deleteItemDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmação" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {item && (
            <span>
              Tem certeza que deseja deletar o item de id <b>{item.id}</b>?
            </span>
          )}
        </div>
      </Dialog>

    </div>
  );
}