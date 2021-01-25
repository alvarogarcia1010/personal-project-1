import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Card, Button, Form, Spinner} from 'react-bootstrap'
import NumberFormat from 'react-number-format';
import {useForm, Controller} from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import AuthManagement from '../../services/AuthManagement'
import * as yup from "yup"
import * as action from '../../store/actions/index'
import {connect} from 'react-redux'

const schema = yup.object().shape({
  name: yup.string().required("Campo obligatiorio"),
  username : yup.string().required("Campo obligatiorio"),
  birth_date: yup.string(),
  phone_number: yup.string(),
  email: yup.string().email("Correo electronico no valido").required("Campo obligatorio"),  
  password: yup.string().required("Campo obligatiorio").min(8, "Debe contener al menos 8 carácteres"),
});

const Register = props => {
  const {register, handleSubmit, errors, formState, control} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const {isSubmitting, touched} = formState;
  
  const onSubmit = async data => {
    const response = await AuthManagement.register(data);

    if(response.data)
    {
      props.onAuthSuccess(response.data.data)
    }
  };

  let authRedirect = null;

  if(props.isAuthenticated){
    authRedirect = <Redirect to='/productos' />
  }

  return (
    <div className="card-container">
      {authRedirect}
      <Card className="custom-card my-4">
        <Card.Body>
          <Card.Title className="text-center">Registrarme</Card.Title>
          <Form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
           <Form.Group controlId="name">
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

            <Form.Group controlId="username">
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
                placeholder="usuario@example.com"
                ref={register}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email && errors.email.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mb-2">
              <Form.Label required>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                name="password" 
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
                disabled={isSubmitting}
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

            <div className="d-flex justify-content-end">
              <div className="mb-4">
                <small>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></small>
              </div>
            </div>

            <div className="d-flex justify-content-end">
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
                <Button variant="primary" type="submit">Registrame</Button>
              }
            </div>
          </Form>
          </Card.Body>
      </Card>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthSuccess: (authData) => dispatch(action.auth(authData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

