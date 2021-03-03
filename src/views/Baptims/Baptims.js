import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '../../components/Header'

const Baptims = () => {
  return (
    <>
      <Header
        name={"Alvaro"} 
        placeholder={"Buscar usuario"}
        onSearch={() => {}}
      />
      <Container fluid>
        <h1>Pantalla de bautismos</h1>
      </Container>
    </>
  )
}

export default Baptims
