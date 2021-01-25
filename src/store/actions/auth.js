import * as actionTypes from './actionTypes'

export const logout = () => {
  localStorage.removeItem('appState');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    ...authData
  }
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime)
  }
}

export const auth = (authData) => {
  return dispatch => {
    const expirationTime = new Date(authData.expires_at).getTime() - new Date().getTime();
    const user = {
      token: authData.token_type + ' ' + authData.token,
      token_type: authData.token_type,
      user_id: authData.id,
      email: authData.attributes.email,
      name: authData.attributes.name,
      username: authData.attributes.username,
      expires_at: authData.expires_at
    }

    localStorage.setItem('appState', JSON.stringify(user));

    dispatch(authSuccess(user));
    dispatch(checkAuthTimeout(expirationTime))
  }
}

export const authCheckState = () => {
  return dispatch => {
    const appState = JSON.parse(localStorage.getItem('appState'));
    
    if(!appState)
    {
      dispatch(logout());
    }
    else
    {
      const expirationTime = new Date(appState.expires_at).getTime() - new Date().getTime();

      if(expirationTime <= 0)
      {
        dispatch(logout());
      }
      else
      {
        const user = {...appState};
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(expirationTime));
      }
    }
  }
}
