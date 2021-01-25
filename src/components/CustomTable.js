import React, {forwardRef} from "react"
import MaterialTable from 'material-table'

const CustomTable = forwardRef((props, ref) => {
  const padding = props.small? 'dense' : "default";
  const toolbar = props.toolbar===false? false : true;
  const grouping = props.grouping? props.grouping : false;
  const exportDefault = props.exportDefault===false? props.exportDefault : true;

  let onRowClick = null;

  let actions = [];

  if(props.onRowClicked)
  {
    onRowClick = props.onRowClicked
  }

  if(props.onRefreshTableClicked)
  {
    actions.push({
      icon: "refresh",
      tooltip: "Actualizar",
      isFreeAction: true,
      onClick: props.onRefreshTableClicked,
    });
  }

  if(props.onEditClickedAction)
  {
    actions.push({
      icon: "edit",
      tooltip: "Editar registro",
      onClick: props.onEditClickedAction,
    });
  }

  if(props.confirmDeleteAction)
  {
    actions.push({
      icon: "delete",
      tooltip: "Eliminar registro",
      onClick: props.confirmDeleteAction
    });
  }

  return (
    <div style={{maxWidth: "100%"}}>
      <MaterialTable
        columns={props.columns}
        data={props.data}
        title={props.title}
        tableRef={ref}
        actions={actions}
        onRowClick={onRowClick}
        options={
        {
          search: false,
          selection: false,
          grouping: grouping,
          toolbar: toolbar,
          padding: padding,
          exportButton: exportDefault,
          actionsColumnIndex: -1,
          headerStyle: 
          {
            fontWeight: "bold",
            textAlign: "center",
            padding: "0.5rem",
            zIndex: 0
          },
          cellStyle: 
          {
            padding: "8px",
            fontSize: '14px',
          },
        }}
        localization={
        {
          body: 
          {
            emptyDataSourceMessage: "No hay registros que mostrar",
          },
          toolbar: 
          {
            searchTooltip: "Buscar",
            searchPlaceholder: "Buscar",
            exportTitle: "Exportar",
            exportCSVName: "Exportar a CSV",
            exportPDFName: "Exportar a PDF",
          },
          header: 
          {
            actions: "",
          },
          grouping:
          {
            labelGroupedBy: "Agrupado por",
            placeholder: "Arrastre las columnas que desea agrupar"
          },
          pagination: 
          {
            labelRowsSelect: "Registros",
            labelDisplayedRows: " Mostrando {from}-{to} de {count}",
            firstTooltip: "Primera página",
            previousTooltip: "Página anterior",
            nextTooltip: "Página siguiente",
            lastTooltip: "Ultima página",
          },
        }}
      />
    </div>
  );
}) 

export default CustomTable;
