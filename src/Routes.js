import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Baptims from './views/Baptims/Baptims'
import Confirmations from './views/Confirmations/Confirmations'
import Login from './views/Login/Login'
import Logout from './views/Logout/Logout'
import Marriages from './views/Marriages/Marriages'
import ChangePassword from './views/ResetPassword/ChangePassword'
import ResetPassword from './views/ResetPassword/ResetPassword'

const Routes = props => {
  return (
    <Switch>
      <Route exact path="/login" component={Login}/>
      {/* <Route exact path="/registrarme" component={Register}/> */}
      <Route exact path="/recuperar-clave" component={ResetPassword}/>
      <Route exact path="/cambiar-clave/:token" component={ChangePassword}/>
      <PrivateRoute path='/bautismos' component={Baptims}/>
      <PrivateRoute path='/confirmaciones' component={Confirmations}/>
      <PrivateRoute path='/matrimonios' component={Marriages}/>
      <PrivateRoute path='/logout' component={Logout}/>
      <Redirect to="/bautismos"/>
    </Switch>
  )
}

export default Routes;
