import React, { useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import CustomTable from '../../components/CustomTable'
import Header from '../../components/Header'
import BaptismManagement from '../../services/BaptismManagement'
import { confirmDeleteFireToast, defaultCellStyles, isEmpty, updateObject, fireMessage } from '../../services/helpers'
import BaptismForm from './BaptismForm'

const initialSelectedBaptism = {
  id:"",
  book_number: null,
  folio_number: null,
  record_number: null,
  date: "",
  name: "",
  birth_date: "",
  father_name: "",
  mother_name: "",
  godfather_name: "",
  god_mother_name: "",
  celebrating_priest: "",
  organization_id: 1,
}

const columns = [
  { field: 'id', hidden: true},
  { field: 'organization_id', hidden: true},
  { field: 'date', hidden: true},
  { field: 'birth_date', hidden: true},
  { title: 'Fecha', field: 'date_with_format', cellStyle: defaultCellStyles},
  { title: 'Libro N°', field: 'book_number', cellStyle:{...defaultCellStyles, textAlign:'center'}, headerStyle: {...defaultCellStyles} },
  { title: 'Folio N°', field: 'folio_number', cellStyle:{...defaultCellStyles}, headerStyle: defaultCellStyles},
  { title: 'Acta N°', field: 'record_number', cellStyle:{...defaultCellStyles}, headerStyle: defaultCellStyles},
  { title: 'Nombre', field: 'name', cellStyle: defaultCellStyles},
  { title: 'Fecha de nacimiento', field: 'birth_date_with_format', cellStyle:{ padding:"8px", fontSize:"14px" }},
  { title: 'Padre', field: 'father_name', cellStyle: defaultCellStyles},
  { title: 'Madre', field: 'mother_name', cellStyle: defaultCellStyles},
  { title: 'Padrino', field: 'godfather_name', cellStyle: defaultCellStyles},
  { title: 'Madrina', field: 'godmother_name', cellStyle: defaultCellStyles},
  { title: 'Sacerdote', field: 'celebrating_priest', cellStyle: defaultCellStyles},
]

const Baptims = () => {
  const [baptism, setBaptism] = useState(initialSelectedBaptism)
  const token = useSelector(state => state.auth.token)
  const tableRef = useRef()

  const fetchData = query => new Promise(async (resolve) => {
    const { rows, page, records } = await BaptismManagement.getBaptisms(query, token)

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
    let baptismData = updateObject(initialSelectedBaptism, {...rowData})
    delete baptismData.tableData;
    delete baptismData.date_with_format;
    delete baptismData.birth_date_with_format;

    setBaptism(baptismData)
  }

  const onConfirmDeleteAction = (_, rowData) => {
    confirmDeleteFireToast(async () => {
      
      const response = await BaptismManagement.deleteOne(rowData.id, token);

      if(response.data)
      {
        refreshTableAction()
      }
    }, "El registro se ha eliminado con exito.")
  }

  const cleanState = () => {
    setBaptism(initialSelectedBaptism)
  }

  const searchBaptism = (search) => {
    tableRef.current && tableRef.current.onQueryChange({search: search})
  }

  const exportToPDF = () => {
    fireMessage("Proximamente!!!")
  }

  return (
    <>
      <Header
        placeholder="Buscar..."
        onSearch={searchBaptism}
      />
      <Container fluid>
        <Row className="my-3 mx-0">
          <Col lg={4} className="mb-4">
            <BaptismForm
              token={token}
              baptismData={baptism}
              onRefreshTableClicked={refreshTableAction}
              cleanState={cleanState}
            />
          </Col>
          <Col lg={8}>
            <CustomTable
              title="Registro de bautismos"
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

export default Baptims
