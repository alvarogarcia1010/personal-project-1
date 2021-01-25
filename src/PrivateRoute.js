import React from 'react';
import {Redirect, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({ component: Component, path, isAuthenticated, ...rest }) => {
  return (
    <Route path={path} {...rest} render={ props => (
      isAuthenticated ?
        <Component {...props} /> :
        <Redirect to='/login' />
    )}/> 
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
