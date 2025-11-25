import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

export default function AcordeaoDataTable({ spec, value, novo = null, editar = null, visualizar = null, confirmarApagar = null, item = null, setItem = null, selectedItems = null, setSelectedItems = null }) {
  const campos = spec.dataTable()[0];

  const isSelectable = (data) => data.nome == "Não encontrado" ? false : true;

  const isRowSelectable = (event) => (event.data ? isSelectable(event.data) : true);

  const rowClassName = (data) => (isSelectable(data) ? '' : 'p-disabled');

  const [deleteItemDialog, setDeleteItemDialog] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  const editarItem = (item) => {
    console.log("edititem", item);
    editar(item);
  };

  const deleteItem = (item) => {
    console.log("deleteItem", item);
    apagar(item);
    setDeleteItemDialog(false);
    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Item Deletado!', life: 3000 });
  };

  const hideDeleteItemDialog = () => {
    setDeleteItemDialog(false);
  };

  const acoes =[
    {id:1, icon:"pi-pencil", handleClick:(item)=>editarItem(item), dica:"editar telefone"},
    {id:1, icon:"pi-trash", handleClick:(item)=>confirmarApagar(item), dica:"apagar telefone"},
];

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {acoes.map((acao) => {
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


  const deleteItemDialogFooter = (
    <React.Fragment>
      <Button label="Não" icon="pi pi-times" outlined onClick={hideDeleteItemDialog} />
      <Button label="Sim" icon="pi pi-check" severity="danger" onClick={deleteItem} />
    </React.Fragment>
  );


  const renderHeader = () => {
    return (
      <div className="pesquisar">
        <Button label="Novo " icon="pi pi-plus" severity="success" onClick={novo} />
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          ref={dt}
          key={campos.id}
          value={value}
          resizableColumns
          selectionMode={null}
          selection={selectedItems}
          onSelectionChange={(e) => setSelectedItems(e.value)}
          isDataSelectable={isRowSelectable}
          rowClassName={rowClassName}
          tableStyle={{ minWidth: '50rem' }}
          header={header}
          scrollable // Enable scrolling
              scrollHeight="400px" // Set the height for the scroll
        >
          {
            campos.editMode &&
            <Column header="Ações" body={actionBodyTemplate} style={{ width: "20%", minWidth: '1rem' }}></Column>
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
                  style={item.style} // TODO: trabalhar isso no spec de cada entidade
                  body={item?.body}
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