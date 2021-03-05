import React from 'react'
import { Button, Card, Form, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
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
        </Form>
      </Card.Body>
    </Card>
  )
}

export default BaptismForm
