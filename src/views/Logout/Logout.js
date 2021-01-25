import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Spinner} from 'react-bootstrap'
import * as actions from '../../store/actions/index'
import {Redirect} from 'react-router-dom';
import AuthManagement from '../../services/AuthManagement'

class Logout extends Component 
{
  componentDidMount() 
  {
    AuthManagement.logout(this.props.token)
      .then(response => {
        this.props.onLogout();
      })
  }
  
  render() 
  {
    return (
      <>
       <div class="card-container">
         <div>
          <Spinner animation="grow" variant="primary" className="spinner-lg"/>
         </div>
          <div>
            <p className="text-primary font-weight-bold mt-3 text-20">Cerrando sesión...</p>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
