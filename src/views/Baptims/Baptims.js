import React, { useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import CustomTable from '../../components/CustomTable'
import Header from '../../components/Header'
import BaptismManagement from '../../services/BaptismManagement'
import { isEmpty } from '../../services/helpers'
import BaptismForm from './BaptismForm'

const columns = [
  { field: 'id', hidden: true},
  { title: 'Nombre', field: 'name', cellStyle:{ padding:"8px", fontSize:"14px" }}
]

const Baptims = () => {
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
    console.log(rowData)
  }

  const onConfirmDeleteAction = (_, rowData) => {

  }

  return (
    <>
      <Header
        placeholder={"Buscar..."}
        onSearch={() => {}}
      />
      <Container fluid>
        <Row className="my-3 mx-0">
          <Col lg={4} className="mb-4">
            <BaptismForm/>
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
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Baptims
