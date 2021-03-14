import React, { useEffect } from 'react'
import NumberFormat from 'react-number-format'
import { Button, Card, Form, Spinner, Col, InputGroup } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { fireToast, isEmpty } from '../../services/helpers'
import MarriageManagement from '../../services/MarriageManagement'

const schema = yup.object().shape({
  book_start: yup.string().nullable(),
  book_end: yup.string().nullable(),
  date: yup.string().required("Campo obligatiorio"),
  husband_name: yup.string().required("Campo obligatiorio"),
  husband_age: yup.string().required("Campo obligatiorio"),
  husband_father: yup.string().nullable(),
  husband_mother: yup.string().nullable(),
  husband_birthplace: yup.string().required("Campo obligatiorio"),
  husband_address: yup.string().required("Campo obligatiorio"),
  wife_name: yup.string().required("Campo obligatiorio"),
  wife_age: yup.string().required("Campo obligatiorio"),
  wife_father: yup.string().nullable(),
  wife_mother: yup.string().nullable(),
  wife_birthplace: yup.string().required("Campo obligatiorio"),
  wife_address: yup.string().required("Campo obligatiorio"),
});

const MarriageForm = ({ marriageData, cleanState, onRefreshTableClicked, token }) => {

  const { register, handleSubmit, errors, formState, control, reset, watch } = useForm({
    mode: 'onBlur',
    defaultValues: marriageData,
    resolver: yupResolver(schema)
  })
  const {isSubmitting, touched} = formState;

  const onSubmit = async (formData, _) => {
    const data = {...formData}

    let response, message;

    if(isEmpty(data.id))
    {
      response = await MarriageManagement.create(data, token);
      message = "El registro se ha guardado con exito.";
    }
    else
    {
      response = await MarriageManagement.update(data, token);
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
      book_start: "",
      book_end: "",
      husband_age: "",
      wife_age: "",
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
    if(!isEmpty(marriageData.id))
    {
      reset(
        {...marriageData}, 
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

  }, [marriageData, reset])

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
          <p className="border-bottom mb-1 mt-4">Datos generales</p>
          <Form.Row className="">
          <Form.Group as={Col} lg={6} controlId="record_book" className="mb-2">
              <Form.Label required>Libro de actas</Form.Label>
              <InputGroup>
                <Controller
                  name="book_start"
                  control={control}
                  as={
                    <NumberFormat 
                      thousandSeparator={false}
                      decimalScale={0}
                      fixedDecimalScale={true}
                      isValid={touched.book_start && !errors.book_start}
                      isInvalid={!!errors.book_start}
                      disabled={isSubmitting}
                      customInput={Form.Control}
                    />}
                />
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-left-0 px-1"> {"->"} </InputGroup.Text>
                </InputGroup.Prepend>
                <Controller
                  name="book_end"
                  control={control}
                  className="rounded-right"
                  as={
                    <NumberFormat 
                      thousandSeparator={false}
                      decimalScale={0}
                      fixedDecimalScale={true}
                      isValid={touched.book_end && !errors.book_end}
                      isInvalid={!!errors.book_end}
                      disabled={isSubmitting}
                      customInput={Form.Control}
                    />}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.book_end && errors.book_end.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} lg={6} controlId="date">
              <Form.Label required>Fecha</Form.Label>
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
          </Form.Row>

          <p className="border-bottom mb-1">Datos del esposo</p>
          <Form.Group controlId="husband_name" className="mb-2">
            <Form.Label required>Nombre</Form.Label>
            <Form.Control
              type="text" 
              name="husband_name" 
              isValid={touched.husband_name && !errors.husband_name}
              isInvalid={!!errors.husband_name}
              disabled={isSubmitting}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.husband_name && errors.husband_name.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} lg={3} controlId="husband_age" className="mb-2">
              <Form.Label required>Edad</Form.Label>
              <Controller
                name="husband_age"
                control={control}
                className="rounded-right"
                as={
                  <NumberFormat 
                    thousandSeparator={false}
                    decimalScale={0}
                    fixedDecimalScale={true}
                    isValid={touched.husband_age && !errors.husband_age}
                    isInvalid={!!errors.husband_age}
                    disabled={isSubmitting}
                    customInput={Form.Control}
                  />}
              />
              <Form.Control.Feedback type="invalid">
                {errors.husband_age && errors.husband_age.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} lg={9} controlId="husband_birthplace" className="mb-2">
              <Form.Label required>Lugar de nacimiento</Form.Label>
              <Form.Control
                type="text" 
                name="husband_birthplace" 
                isValid={touched.husband_birthplace && !errors.husband_birthplace}
                isInvalid={!!errors.husband_birthplace}
                disabled={isSubmitting}
                ref={register}
              />
              <Form.Control.Feedback type="invalid">
                {errors.husband_birthplace && errors.husband_birthplace.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="husband_father" className="mb-2">
              <Form.Label>Nombre del padre</Form.Label>
              <Form.Control
                type="text" 
                name="husband_father" 
                isValid={touched.husband_father && !errors.husband_father}
                isInvalid={!!errors.husband_father}
                disabled={isSubmitting}
                ref={register}
              />
              <Form.Control.Feedback type="invalid">
                {errors.husband_father && errors.husband_father.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="husband_mother" className="mb-2">
              <Form.Label>Nombre de la madre</Form.Label>
              <Form.Control
                type="text" 
                name="husband_mother" 
                isValid={touched.husband_mother && !errors.husband_mother}
                isInvalid={!!errors.husband_mother}
                disabled={isSubmitting}
                ref={register}
              />
              <Form.Control.Feedback type="invalid">
                {errors.husband_mother && errors.husband_mother.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="husband_address" className="mb-2">
            <Form.Label required>Dirección</Form.Label>
            <Form.Control
              type="text" 
              name="husband_address" 
              isValid={touched.husband_address && !errors.husband_address}
              isInvalid={!!errors.husband_address}
              disabled={isSubmitting}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.husband_address && errors.husband_address.message}
            </Form.Control.Feedback>
          </Form.Group>

          <p className="border-bottom mb-0">Datos de la esposa</p>
          <Form.Group controlId="wife_name" className="mb-2">
            <Form.Label required>Nombre</Form.Label>
            <Form.Control
              type="text" 
              name="wife_name" 
              isValid={touched.wife_name && !errors.wife_name}
              isInvalid={!!errors.wife_name}
              disabled={isSubmitting}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.wife_name && errors.wife_name.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} lg={3} controlId="wife_age" className="mb-2">
              <Form.Label required>Edad</Form.Label>
              <Controller
                name="wife_age"
                control={control}
                className="rounded-right"
                as={
                  <NumberFormat 
                    thousandSeparator={false}
                    decimalScale={0}
                    fixedDecimalScale={true}
                    isValid={touched.wife_age && !errors.wife_age}
                    isInvalid={!!errors.wife_age}
                    disabled={isSubmitting}
                    customInput={Form.Control}
                  />}
              />
              <Form.Control.Feedback type="invalid">
                {errors.wife_age && errors.wife_age.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} lg={9} controlId="wife_birthplace" className="mb-2">
              <Form.Label required>Lugar de nacimiento</Form.Label>
              <Form.Control
                type="text" 
                name="wife_birthplace" 
                isValid={touched.wife_birthplace && !errors.wife_birthplace}
                isInvalid={!!errors.wife_birthplace}
                disabled={isSubmitting}
                ref={register}
              />
              <Form.Control.Feedback type="invalid">
                {errors.wife_birthplace && errors.wife_birthplace.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="wife_father" className="mb-2">
              <Form.Label>Nombre del padre</Form.Label>
              <Form.Control
                type="text" 
                name="wife_father" 
                isValid={touched.wife_father && !errors.wife_father}
                isInvalid={!!errors.wife_father}
                disabled={isSubmitting}
                ref={register}
              />
              <Form.Control.Feedback type="invalid">
                {errors.wife_father && errors.wife_father.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="wife_mother" className="mb-2">
              <Form.Label>Nombre de la madre</Form.Label>
              <Form.Control
                type="text" 
                name="wife_mother" 
                isValid={touched.wife_mother && !errors.wife_mother}
                isInvalid={!!errors.wife_mother}
                disabled={isSubmitting}
                ref={register}
              />
              <Form.Control.Feedback type="invalid">
                {errors.wife_mother && errors.wife_mother.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="wife_address" className="mb-2">
            <Form.Label required>Dirección</Form.Label>
            <Form.Control
              type="text" 
              name="wife_address" 
              isValid={touched.wife_address && !errors.wife_address}
              isInvalid={!!errors.wife_address}
              disabled={isSubmitting}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.wife_address && errors.wife_address.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default MarriageForm
