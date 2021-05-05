import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalPrintPDF = ({show, handleClose}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Generar PDF</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        
      </Modal.Body>
    </Modal>
  )
}

export default ModalPrintPDF
