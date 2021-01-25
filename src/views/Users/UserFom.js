import React, {useEffect} from 'react'
import {Button, Card, Form, Spinner} from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import {useForm, Controller} from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import UserManagement from '../../services/UserManagement'
import * as yup from "yup"
import { fireToast, isEmpty } from '../../services/helpers'

const schema = yup.object().shape({
  name: yup.string().required("Campo obligatiorio"),
  username : yup.string().required("Campo obligatiorio"),
  password: yup.string().nullable(),
  birth_date: yup.string(),
  phone_number: yup.string().nullable(),
  email: yup.string().email("Correo electronico no valido").required("Campo obligatorio"),  
});

const UserForm = (props) => {

  const {register, handleSubmit, errors, formState, control, setError, reset, watch} = useForm({
    mode: 'onBlur',
    defaultValues: props.article,
    resolver: yupResolver(schema)
  });
  const {isSubmitting, touched} = formState;
  
  const onSubmit = async (data, e) => {
    let response, message;

    if(isEmpty(data.id))
    {
      if(isEmpty(data.password))
      {
        setError('password', {message:"Campo obligatorio"})
        return;
      }

      response = await UserManagement.create(data, props.token);
      message = "El usuario se ha guardado con exito.";
    }
    else
    {
      response = await UserManagement.update(data, props.token);
      message = "El usuario se ha actualizado con exito.";
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
      phone_number: ""
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
    if(!isEmpty(props.user.id))
    {
      reset(
      {...props.user}, 
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
  }, [props.user]);
  
  return (
    <Card>
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Card.Title className="text-center text-md-left">
            {isEmpty(watch('id'))? "Agregar usuario" : "Editar usuario"}
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

          <Form.Group controlId="username" className="mb-2">
            <Form.Label required>Nombre de usuario</Form.Label>
            <Form.Control 
              type="text" 
              name="username" 
              isValid={touched.username && !errors.username}
              isInvalid={!!errors.username}
              disabled={isSubmitting}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username && errors.username.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email">
              <Form.Label required>Correo electrónico</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
                disabled={isSubmitting}
                ref={register}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email && errors.email.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mb-2">
              <Form.Label required={isEmpty(watch("id"))}>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                name="password" 
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
                disabled={isSubmitting}
                placeholder="Password"
                ref={register}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password && errors.password.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="birth_date">
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

            <Form.Group controlId="phone_number">
              <Form.Label>Teléfono</Form.Label>
              <Controller
                name="phone_number"
                defaultValue=""
                control={control}
                as={
                  <NumberFormat
                    name="phone_number"
                    format="####-####" 
                    mask="_"
                    placeholder="7777-7777"
                    isValid={touched.phone_number && !errors.phone_number}
                    isInvalid={!!errors.phone_number}
                    disabled={isSubmitting}
                    customInput={Form.Control}
                  />}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone_number && errors.phone_number.message}
              </Form.Control.Feedback>
            </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default UserForm;
