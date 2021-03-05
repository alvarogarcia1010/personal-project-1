import React from 'react'
import NumberFormat from 'react-number-format'
import { Button, Card, Form, Spinner, Col, InputGroup } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { isEmpty } from '../../services/helpers'

const schema = yup.object().shape({
  name: yup.string().required("Campo obligatiorio"),
});

const BaptismForm = ({ baptismData }) => {

  const { register, handleSubmit, errors, formState, control, reset, watch } = useForm({
    mode: 'onBlur',
    defaultValues: baptismData,
    resolver: yupResolver(schema)
  })
  const {isSubmitting, touched} = formState;

  const onSubmit = () => {
    
  }

  const cleanData = () => {
    
  }

  return (
    <Card>
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Card.Title>
          {isEmpty(watch('id'))? "Agregar registro" : "Editar registro"}
            <div className="float-md-right mt-2 mt-md-0">
              <Button variant="success" className="mr-1" onClick={cleanData}>Nuevo</Button>
              {isSubmitting?
              <Button variant="primary" disabled={isSubmitting}>
                <Spinner 
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {' Cargando...'}
              </Button>
              :
              <Button variant="primary" type="submit">Guardar</Button>
              }
            </div>
          </Card.Title>
          <Form.Control 
            type="hidden" 
            name="id"
            disabled={isSubmitting}
            ref={register}
          />
          <Form.Row className="mt-4">
            <Form.Group as={Col} controlId="book_number" className="mb-2">
              <Form.Label>Libro N°</Form.Label>
              <Controller
                name="book_number"
                control={control}
                as={
                  <NumberFormat 
                    thousandSeparator={false}
                    decimalScale={0}
                    isValid={touched.book_number && !errors.book_number}
                    isInvalid={!!errors.book_number}
                    disabled={isSubmitting}
                    customInput={Form.Control}
                  />}
              />
              <Form.Control.Feedback type="invalid">
                {errors.book_number && errors.book_number}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="folio_number" className="mb-2">
              <Form.Label>Folio N°</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
                </InputGroup.Prepend>
                <Controller
                  name="folio_number"
                  control={control}
                  as={
                    <NumberFormat 
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      isValid={touched.folio_number && !errors.folio_number}
                      isInvalid={!!errors.folio_number}
                      disabled={isSubmitting}
                      customInput={Form.Control}
                    />}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.folio_number && errors.folio_number.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} controlId="record_number" className="mb-2">
              <Form.Label>Acta N°</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
                </InputGroup.Prepend>
                <Controller
                  name="record_number"
                  control={control}
                  as={
                    <NumberFormat 
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      isValid={touched.record_number && !errors.record_number}
                      isInvalid={!!errors.record_number}
                      disabled={isSubmitting}
                      customInput={Form.Control}
                    />}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.record_number && errors.record_number.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="name" className="mb-2">
            <Form.Label required>Nombre</Form.Label>
            <Form.Control
              type="text" 
              name="name" 
              isValid={touched.name && !errors.name}
              isInvalid={!!errors.name}
              disabled={isSubmitting}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name && errors.name.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="birth_date">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control 
                type="date" 
                name="birth_date"
                isValid={touched.birth_date && !errors.birth_date}
                isInvalid={!!errors.birth_date}
                disabled={isSubmitting}
                ref={register}
              />
              <Form.Control.Feedback type="invalid">
                {errors.birth_date && errors.birth_date.message}
              </Form.Control.Feedback>
            </Form.Group>

          </Form.Row>


          <Form.Group controlId="father_name" className="mb-2">
            <Form.Label required>Nombre del padre</Form.Label>
            <Form.Control
              type="text" 
              name="father_name" 
              isValid={touched.father_name && !errors.father_name}
              isInvalid={!!errors.father_name}
              disabled={isSubmitting}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.father_name && errors.father_name.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="mother_name" className="mb-2">
            <Form.Label required>Nombre de la madre</Form.Label>
            <Form.Control
              type="text" 
              name="mother_name" 
              isValid={touched.mother_name && !errors.mother_name}
              isInvalid={!!errors.mother_name}
              disabled={isSubmitting}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.mother_name && errors.mother_name.message}
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group controlId="godfather_name" className="mb-2">
            <Form.Label required>Padrino</Form.Label>
            <Form.Control
              type="text" 
              name="godfather_name" 
              isValid={touched.godfather_name && !errors.godfather_name}
              isInvalid={!!errors.godfather_name}
              disabled={isSubmitting}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.godfather_name && errors.godfather_name.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="godmother_name" className="mb-2">
            <Form.Label required>Madrina</Form.Label>
            <Form.Control
              type="text" 
              name="godmother_name" 
              isValid={touched.godmother_name && !errors.godmother_name}
              isInvalid={!!errors.godmother_name}
              disabled={isSubmitting}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.godmother_name && errors.godmother_name.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="celebrating_priest" className="mb-2">
            <Form.Label required>Celebrante</Form.Label>
            <Form.Control
              type="text" 
              name="celebrating_priest" 
              isValid={touched.celebrating_priest && !errors.celebrating_priest}
              isInvalid={!!errors.celebrating_priest}
              disabled={isSubmitting}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.celebrating_priest && errors.celebrating_priest.message}
            </Form.Control.Feedback>
          </Form.Group>

        </Form>
      </Card.Body>
    </Card>
  )
}

export default BaptismForm
