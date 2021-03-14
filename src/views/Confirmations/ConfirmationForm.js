import React, { useEffect } from 'react'
import NumberFormat from 'react-number-format'
import { Button, Card, Form, Spinner, Col } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { fireToast, isEmpty } from '../../services/helpers'
import ConfirmationManagement from '../../services/ConfirmationManagement'

const schema = yup.object().shape({
  book_number: yup.string().nullable(),
  folio_number: yup.string().nullable(),
  record_number: yup.string().nullable(),
  name: yup.string().required("Campo obligatiorio"),
  birth_date: yup.string().required("Campo obligatiorio"),
  father_name: yup.string().nullable(),
  mother_name: yup.string().nullable(),
  godfather_name: yup.string().nullable(),
  godmother_name: yup.string().nullable(),
});

const ConfirmationForm = ({ confirmationData, cleanState, onRefreshTableClicked, token }) => {

  const { register, handleSubmit, errors, formState, control, reset, watch } = useForm({
    mode: 'onBlur',
    defaultValues: confirmationData,
    resolver: yupResolver(schema)
  })
  const {isSubmitting, touched} = formState;

  const onSubmit = async (formData, _) => {
    const data = {...formData}
    data.book_number = parseInt(data.book_number.replace(',', ''))
    data.folio_number = parseFloat(data.folio_number.replace(',', ''))
    data.record_number = parseFloat(data.record_number.replace(',', ''))

    let response, message;

    if(isEmpty(data.id))
    {
      response = await ConfirmationManagement.create(data, token);
      message = "El registro se ha guardado con exito.";
    }
    else
    {
      response = await ConfirmationManagement.update(data, token);
      message = "El registro se ha actualizado con exito.";
    }

    if(response.data)
    {
      fireToast(message)
      onRefreshTableClicked()
      cleanData()
    }
  };

  const cleanData = () => {
    cleanState()
    reset(
    {
      id: "",
      book_number: "",
      folio_number: "",
      record_number: "",
      organization_id: 1
    },
    {
      errors: false,
      dirtyFields: false,
      isDirty: false,
      isSubmitted: false,
      touched: false,
      isValid: false,
      submitCount: false,
    });
  }

  useEffect(() => {
    if(!isEmpty(confirmationData.id))
    {
      reset(
        {...confirmationData}, 
        {
          errors: false,
          dirtyFields: false,
          isDirty: false,
          isSubmitted: false,
          touched: false,
          isValid: false,
          submitCount: false,
        }
      );
    }

  }, [confirmationData, reset])

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
          <Form.Control 
            type="hidden" 
            name="organization_id"
            disabled={isSubmitting}
            ref={register}
          />
          <Form.Row className="mt-4 pt-2">
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
              <Controller
                name="folio_number"
                control={control}
                as={
                  <NumberFormat 
                    thousandSeparator={true}
                    decimalScale={0}
                    isValid={touched.folio_number && !errors.folio_number}
                    isInvalid={!!errors.folio_number}
                    disabled={isSubmitting}
                    customInput={Form.Control}
                  />}
              />
              <Form.Control.Feedback type="invalid">
                {errors.folio_number && errors.folio_number.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="record_number" className="mb-2">
              <Form.Label>Acta N°</Form.Label>
              <Controller
                name="record_number"
                control={control}
                as={
                  <NumberFormat 
                    thousandSeparator={true}
                    decimalScale={0}
                    isValid={touched.record_number && !errors.record_number}
                    isInvalid={!!errors.record_number}
                    disabled={isSubmitting}
                    customInput={Form.Control}
                  />}
              />
              <Form.Control.Feedback type="invalid">
                {errors.record_number && errors.record_number.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} lg={6} controlId="date">
              <Form.Label required>Fecha de confirmación</Form.Label>
              <Form.Control 
                type="date" 
                name="date"
                isValid={touched.date && !errors.date}
                isInvalid={!!errors.date}
                disabled={isSubmitting}
                ref={register}
              />
              <Form.Control.Feedback type="invalid">
                {errors.date && errors.date.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} lg={6} controlId="birth_date">
              <Form.Label required>Fecha de nacimiento</Form.Label>
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
            <Form.Group as={Col} controlId="father_name" className="mb-2">
              <Form.Label>Nombre del padre</Form.Label>
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

            <Form.Group as={Col} controlId="mother_name" className="mb-2">
              <Form.Label>Nombre de la madre</Form.Label>
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
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="godfather_name" className="mb-2">
              <Form.Label>Padrino</Form.Label>
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

            <Form.Group as={Col} controlId="godmother_name" className="mb-2">
              <Form.Label>Madrina</Form.Label>
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
          </Form.Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ConfirmationForm
