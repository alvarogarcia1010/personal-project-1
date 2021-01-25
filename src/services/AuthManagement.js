import axiosInstance from '../AxiosInstance'
import {fireMessage, fireErrorMessage} from './helpers'

export const login = async (data) => {
  let response;

  try 
  {
    let url = axiosInstance.defaults.baseURL + '/login';
    response = await axiosInstance.post(url, data);
  } 
  catch (error) 
  {
    response = error.response.data;

    if(error.response.status === 401)
    {
      fireMessage(response.errors.title, response.errors.detail);
    }
    else
    {
      fireErrorMessage();
    }
    
  }
  finally
  {
    return response;
  }
}

export const register = async (data) => {
  let response;

  try 
  {
    let url = axiosInstance.defaults.baseURL + '/register';
    response = await axiosInstance.post(url, data);
  } 
  catch (error) 
  {
    response = error.response.data;

    if(error.response.status === 422)
    {
      let details = '<ul>';

      response.errors.forEach(error => {
        details += `<li>${error.title}</li>`; 
      });

      details += '</ul>';

      fireMessage("Información", details, 'info', true);
    }
    else
    {
      fireErrorMessage();
    }
  }
  finally
  {
    return response;
  }
}

export const resetPassword = async (data) => {
  let response;

  try 
  {
    let url = axiosInstance.defaults.baseURL + '/reset-password';
    response = await axiosInstance.post(url, data);
    response = response.data;
  } 
  catch (error) 
  {
    response = error.response.data;

    if(error.response.status === 400)
    {
      fireMessage(response.errors.title, response.errors.detail);
    }
    else
    {
      fireErrorMessage();
    }
  }
  finally
  {
    return response;
  }
}

export const changePassword = async (data) => {
  let response;

  try 
  {
    let url = axiosInstance.defaults.baseURL + '/password/reset';
    response = await axiosInstance.post(url, data);
    response = response.data;
  } 
  catch (error) 
  {
    response = error.response.data;

    if(error.response.status === 400)
    {
      fireMessage(response.errors.title, response.errors.detail);
    }
    else
    {
      fireErrorMessage();
    }
  }
  finally
  {
    return response;
  }
}

export const logout = async (token) => {
  let response;

  try 
  {
    let url = axiosInstance.defaults.baseURL + '/logout';
    response = await axiosInstance.get(url, {
      headers: {
        Authorization: token
      }
    });
  } 
  catch (error) 
  {
    response = error.response.data;

    if(error.response.status === 401)
    {
      fireMessage("Acceso no autorizado", "Favor inicie sesión");
    }
    else
    {
      fireErrorMessage();
    }
    
  }
  finally
  {
    return response;
  }

}

export default {login, register, resetPassword, changePassword, logout}