import React, {useState} from "react";
import {Form, Modal, Button} from "react-bootstrap";
import DownloadPDF from "../components/DownloadPDF";

const INITIAL_STATE = {
  date: "",
  reason: "",
  priest: "Pbro. Juan Ramón Servellón"
};

const ModalPrintPDF = ({show, handleClose, PdfComponent, data}) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [additionalData, setAdditionalData] = useState(INITIAL_STATE);

  const updateAdditionalData = payload => {
    const updateAdditionalData = {
      ...additionalData,
      ...payload
    };

    setAdditionalData(updateAdditionalData);
  };

  const onHandleSubmit = () => {
    setIsGeneratingPdf(true);
  };

  const onHandleClose = () => {
    setIsGeneratingPdf(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={onHandleClose} centered>
      <Modal.Header closeButton>
        <h5 className="mb-0">Generar PDF</h5>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="date">
          <Form.Label required>Fecha</Form.Label>
          <Form.Control
            type="date"
            value={additionalData.date}
            onChange={evt => updateAdditionalData({date: evt.target.value})}
          />
          {/* <Form.Control.Feedback type="invalid">
            {errors.date && errors.date.message}
          </Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group controlId="name" className="mb-2">
          <Form.Label required>Motivo</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={additionalData.reason}
            onChange={evt => updateAdditionalData({reason: evt.target.value})}
          />
          {/* <Form.Control.Feedback type="invalid">
            {errors.name && errors.name.message}
          </Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group controlId="name" className="mb-2">
          <Form.Label required>Párroco</Form.Label>
          <Form.Control
            type="text"
            value={additionalData.priest}
            onChange={evt => updateAdditionalData({priest: evt.target.value})}
          />
          {/* <Form.Control.Feedback type="invalid">
            {errors.name && errors.name.message}
          </Form.Control.Feedback> */}
        </Form.Group>

        <div className="text-center mt-3">
          <Button variant="primary" onClick={onHandleSubmit}>
            Generar fé de bautismo
          </Button>

          {isGeneratingPdf && (
            <DownloadPDF
              fileName={"Fe de bautismo"}
              Pdf={<PdfComponent rowData={data} additionalData={additionalData} />}
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalPrintPDF;
