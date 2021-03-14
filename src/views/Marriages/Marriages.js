import React, { useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import CustomTable from '../../components/CustomTable'
import Header from '../../components/Header'
import MarriageManagement from '../../services/MarriageManagement'
import { confirmDeleteFireToast, defaultCellStyles, isEmpty, updateObject, fireMessage } from '../../services/helpers'
import MarriageForm from './MarriageForm'

const initialSelectedMarriage = {
  id:"",
  book_start: null,
  book_end: null,
  date: "",
  husband_name: "",
  husband_age: "",
  husband_father: "",
  husband_mother: "",
  husband_birthplace: "",
  husband_address: "",
  wife_name: "",
  wife_age: "",
  wife_father: "",
  wife_mother: "",
  wife_birthplace: "",
  wife_address: "",
  organization_id: 1,
}

const columns = [
  { field: 'id', hidden: true},
  { field: 'organization_id', hidden: true},
  { field: 'date', hidden: true},
  { title: 'Fecha', field: 'date_with_format', cellStyle: defaultCellStyles},
  { title: 'Desde', field: 'book_start', cellStyle:{...defaultCellStyles, textAlign:'center'}, headerStyle: {...defaultCellStyles} },
  { title: 'Hasta', field: 'book_end', cellStyle:{...defaultCellStyles, textAlign:'center'}, headerStyle: defaultCellStyles},
  { title: 'Esposo', field: 'husband_name', cellStyle: defaultCellStyles},
  { title: 'Edad', field: 'husband_age', cellStyle:{...defaultCellStyles, textAlign:'center'}, headerStyle: {...defaultCellStyles} },
  { title: 'Padre', field: 'husband_father', cellStyle: defaultCellStyles},
  { title: 'Madre', field: 'husband_mother', cellStyle: defaultCellStyles},
  { title: 'Lugar de nacimiento', field: 'husband_birthplace', cellStyle: defaultCellStyles},
  { title: 'Dirección', field: 'husband_address', cellStyle: defaultCellStyles},
  { title: 'Esposa', field: 'wife_name', cellStyle: defaultCellStyles},
  { title: 'Edad', field: 'wife_age', cellStyle:{...defaultCellStyles, textAlign:'center'}, headerStyle: {...defaultCellStyles} },
  { title: 'Padre', field: 'wife_father', cellStyle: defaultCellStyles},
  { title: 'Madre', field: 'wife_mother', cellStyle: defaultCellStyles},
  { title: 'Lugar de nacimiento', field: 'wife_birthplace', cellStyle: defaultCellStyles},
  { title: 'Dirección', field: 'wife_address', cellStyle: defaultCellStyles},
]

const Marriages = () => {
  const [marriage, setMarriage] = useState(initialSelectedMarriage)
  const token = useSelector(state => state.auth.token)
  const tableRef = useRef()

  const fetchData = query => new Promise(async (resolve) => {
    const { rows, page, records } = await MarriageManagement.getMarriages(query, token)

    resolve({
      data: rows,
      page: !isEmpty(page) ? page - 1 : page,
      totalCount: records
    })
  })

  const refreshTableAction = () => {
    tableRef.current && tableRef.current.onQueryChange()
  };

  const onEditAction = (event, rowData) => {
    event.stopPropagation();
    let marriageData = updateObject(initialSelectedMarriage, {...rowData})
    delete marriageData.tableData;
    delete marriageData.date_with_format;

    setMarriage(marriageData)
  }

  const onConfirmDeleteAction = (_, rowData) => {
    confirmDeleteFireToast(async () => {
      
      const response = await MarriageManagement.deleteOne(rowData.id, token);

      if(response.data)
      {
        refreshTableAction()
      }
    }, "El registro se ha eliminado con exito.")
  }

  const cleanState = () => {
    setMarriage(initialSelectedMarriage)
  }

  const searchMarriage = (search) => {
    tableRef.current && tableRef.current.onQueryChange({search: search})
  }

  const exportToPDF = () => {
    fireMessage("Proximamente!!!")
  }

  return (
    <>
      <Header
        placeholder="Buscar..."
        onSearch={searchMarriage}
      />
      <Container fluid>
        <Row className="my-3 mx-0">
          <Col lg={4} className="mb-4">
            <MarriageForm
              token={token}
              marriageData={marriage}
              onRefreshTableClicked={refreshTableAction}
              cleanState={cleanState}
            />
          </Col>
          <Col lg={8}>
            <CustomTable
              title="Registro de matrimonios"
              columns={columns}
              data={fetchData}
              ref={tableRef}
              confirmDeleteAction={onConfirmDeleteAction}
              onEditClickedAction={onEditAction}
              onRefreshTableClicked={refreshTableAction}
              onCreatePDF={exportToPDF}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Marriages
