import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Card, Button, Form, Spinner} from 'react-bootstrap'
import {useForm} from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import AuthManagement from '../../services/AuthManagement'
import * as yup from "yup"
import * as action from '../../store/actions/index'
import {connect} from 'react-redux'

const schema = yup.object().shape({
  email: yup.string().email("Correo electronico no valido").required("Campo obligatorio"),
  password: yup.string().required("Campo obligatiorio"),
});

const Login = props => {
  const {register, handleSubmit, errors, formState} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const {isSubmitting, touched} = formState;
  
  const onSubmit = async data => {
    const response = await AuthManagement.login(data);

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
      <Card className="custom-card">
        <Card.Body>
          <Card.Title className="text-center">Inicio de sesión</Card.Title>
          <Form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
            <div className="d-flex flex-column flex-sm-row justify-content-between">
              <div className="mb-sm-4">
                <Link to="/recuperar-clave"><small>¿Olvidaste tu contraseña?</small></Link>
              </div>
              <div className="mb-4">
                <small>¿Aún no tienes cuenta? <Link to="/registrarme">Registrate</Link></small>
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
                <Button variant="primary" type="submit">Siguiente</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
