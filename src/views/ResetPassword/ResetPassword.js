import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Card, Button, Form, Spinner} from 'react-bootstrap'
import {useForm} from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import {fireToast} from '../../services/helpers'
import AuthManagement from '../../services/AuthManagement'
import * as yup from "yup"
import {connect} from 'react-redux'

const schema = yup.object().shape({
  email: yup.string().email("Correo electronico no valido").required("Campo obligatorio"),
});

const ResetPassword = props => {
  const {register, handleSubmit, errors, formState} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const {isSubmitting, touched} = formState;
  
  const onSubmit = async (data, e) => {
    const response = await AuthManagement.resetPassword(data);

    if(response.data)
    {
      fireToast(response.data.message)
      e.target.reset()
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
          <Card.Title className="text-center">Restablecer contraseña</Card.Title>
          <Card.Text><small>Se le enviará un correo con el enlace para poder restablecer su contraseña</small> </Card.Text>
          <Form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Form.Group controlId="email" className="mb-2">
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
                <Button variant="primary" type="submit">Reestablecer</Button>
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

export default connect(mapStateToProps)(ResetPassword);