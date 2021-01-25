import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import AppRoutes from './Routes'
import * as actions from './store/actions/index'
import './App.css'

class App extends Component {

  UNSAFE_componentWillMount()
  {
    this.props.onTryAutoSignUp();
  }

  render(){
    return (
      <BrowserRouter>
        <Route component={AppRoutes}/>
      </BrowserRouter>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);
