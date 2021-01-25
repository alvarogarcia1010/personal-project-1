import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../services/helpers';

const initialState = {
  id: null,
  token: null,
  token_type: null,
  name: null,
  email: null
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    token_type: action.token_type,
    id: action.id,
    name: action.name,
    email: action.email,
  });
}

const authLogout = (state, action) => {
  return updateObject(state, {...initialState});
}

const reducer = (state = initialState, action) => {
  switch (action.type) 
  {
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;