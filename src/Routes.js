import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Articles from './views/Articles/Articles'
import Login from './views/Login/Login'
import Logout from './views/Logout/Logout'
import Register from './views/Register/Register'
import ChangePassword from './views/ResetPassword/ChangePassword'
import ResetPassword from './views/ResetPassword/ResetPassword'
import Users from './views/Users/Users'

const Routes = props => {
  return (
    <Switch>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/registrarme" component={Register}/>
      <Route exact path="/recuperar-clave" component={ResetPassword}/>
      <Route exact path="/cambiar-clave/:token" component={ChangePassword}/>
      <PrivateRoute path='/productos' component={Articles}/>
      <PrivateRoute path='/usuarios' component={Users}/>
      <PrivateRoute path='/logout' component={Logout}/>
      <Redirect to="/productos"/>
    </Switch>
  )
}

export default Routes;
