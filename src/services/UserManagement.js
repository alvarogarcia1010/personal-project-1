import axiosInstance from '../AxiosInstance'
import {isEmpty, onErrorHandler} from './helpers'

export const getUsers = async (query, token) => {
  let usersData = {
    rows: [],
    page: 1,
    records: 0
  };

  try 
  {
    let url = axiosInstance.defaults.baseURL + '/users?';
    url += 'page[size]=' + query.pageSize;
    url += '&page[number]=' + (query.page + 1);
    url += '&filter=' + query.search;

    if(!isEmpty(query.orderDirection))
    {
      url += '&sortOrder=' + query.orderDirection;
    }

    if(!isEmpty(query.orderBy))
    {
      url += '&sortColumn=' + query.orderBy.field;
    }

    let response = await axiosInstance.get(url, {
      headers: {
        Authorization: token
      }
    });

    let rows = [];

    response.data.data.forEach(user => {
      rows.push({
        id: user.id,
        ...user.attributes
      });
    });

    usersData.rows = rows;
    usersData.page = response.data.meta.page;
    usersData.records = response.data.meta.records;
  }
  catch (error)
  {
    onErrorHandler(error.response)
  }
  finally
  {
    return usersData;
  }
}

export const create = async (data, token) => {
  let response;
  try 
  {
    let url = axiosInstance.defaults.baseURL + '/users';

    response = await axiosInstance.post(url, data, {
      headers: {
        Authorization: token
      }
    });

    response = response.data;
  }
  catch (error)
  {
    response = error.response.data;
    onErrorHandler(error.response)
  }
  finally
  {
    return response;
  }
}

export const update = async (data, token) => {
  let response;
  try 
  {
    let url = axiosInstance.defaults.baseURL + `/users/${data.id}`;
    data.id = undefined;

    if(isEmpty(data.password))
    {
      data.password = undefined;
    }

    response = await axiosInstance.put(url, data, {
      headers: {
        Authorization: token
      }
    });

    response = response.data;
  }
  catch (error)
  {
    response = error.response.data;
    onErrorHandler(error.response)
  }
  finally
  {
    return response;
  }
}

export const deleteOne = async (id, token) => {
  let response;
  try 
  {
    let url = axiosInstance.defaults.baseURL + `/users/${id}`;

    response = await axiosInstance.delete(url, {
      headers: {
        Authorization: token
      }
    });

    response = response.data;
  }
  catch (error)
  {
    response = error.response.data;
    onErrorHandler(error.response)
  }
  finally
  {
    return response;
  }
}

export default {getUsers, create, update, deleteOne};