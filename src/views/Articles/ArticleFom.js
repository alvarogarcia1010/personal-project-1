import React, {useEffect} from 'react'
import {Button, Card, Form, Col, InputGroup, Spinner} from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import {useForm, Controller} from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import ArticleManagement from '../../services/ArticleManagement'
import * as yup from "yup"
import { fireToast, isEmpty } from '../../services/helpers'

const schema = yup.object().shape({
  sku: yup.string(),
  name: yup.string().required("Campo obligatiorio"),
  quantity: yup.string().required("Campo obligatiorio"),
  price: yup.string().required("Campo obligatiorio"),
  remark: yup.string(),
  image_url: yup.string(),
});

const ArticleFom = (props) => {

  const {register, handleSubmit, errors, formState, control, reset, watch} = useForm({
    mode: 'onBlur',
    defaultValues: props.article,
    resolver: yupResolver(schema)
  });
  const {isSubmitting, touched} = formState;
  
  const onSubmit = async (data, e) => {
    data.quantity = parseInt(data.quantity.replace(',', ''))
    data.price = parseFloat(data.price.replace(',', ''))

    let response, message;

    if(isEmpty(data.id))
    {
      response = await ArticleManagement.create(data, props.token);
      message = "El artículo se ha guardado con exito.";
    }
    else
    {
      response = await ArticleManagement.update(data, props.token);
      message = "El artículo se ha actualizado con exito.";
    }

    if(response.data)
    {
      fireToast(message)
      props.onRefreshTableClicked()
      cleanData()
    }
  };

  const cleanData = () => {
    props.cleanState()
    reset(
    {
      id: "",
      quantity: "",
      price: ""
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
    if(!isEmpty(props.article.id))
    {
      reset(
      {...props.article}, 
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
  }, [props.article]);
  

  return (
    <Card>
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Card.Title className="text-center text-md-left">
            {isEmpty(watch('id'))? "Agregar artículo" : "Editar artículo"}
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
          <Form.Group controlId="sku" className="mb-2">
            <Form.Label>Sku</Form.Label>
            <Form.Control 
              type="text" 
              name="sku"
              isValid={touched.sku && !errors.sku}
              isInvalid={!!errors.sku}
              disabled={isSubmitting}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.sku && errors.sku.message}
            </Form.Control.Feedback>
          </Form.Group>

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

          <Form.Row className="mb-0">
            <Form.Group as={Col} controlId="quantity" className="mb-2">
              <Form.Label required>Cantidad</Form.Label>
              <Controller
                name="quantity"
                control={control}
                as={
                  <NumberFormat 
                    thousandSeparator={true}
                    decimalScale={0}
                    isValid={touched.quantity && !errors.quantity}
                    isInvalid={!!errors.quantity}
                    disabled={isSubmitting}
                    customInput={Form.Control}
                  />}
              />
              <Form.Control.Feedback type="invalid">
                {errors.quantity && errors.quantity.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="price" className="mb-2">
              <Form.Label required>Precio</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                </InputGroup.Prepend>
                <Controller
                  name="price"
                  control={control}
                  as={
                    <NumberFormat 
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      isValid={touched.price && !errors.price}
                      isInvalid={!!errors.price}
                      disabled={isSubmitting}
                      customInput={Form.Control}
                    />}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price && errors.price.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="image_url" className="mb-2">
            <Form.Label>URL de imagen</Form.Label>
            <Form.Control 
              type="text" 
              name="image_url"
              isValid={touched.image_url && !errors.image_url}
              isInvalid={!!errors.image_url}
              disabled={isSubmitting}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.image_url && errors.image_url.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="remark" className="mb-2">
            <Form.Label>Descripción</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={4} 
              name="remark" 
              isValid={touched.remark && !errors.remark}
              isInvalid={!!errors.remark}
              disabled={isSubmitting}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.remark && errors.remark.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ArticleFom;
