import axiosInstance from '../AxiosInstance'
import {isEmpty, onErrorHandler} from './helpers'

export const getBaptisms = async (query, token) => {
  let baptismData = {
    rows: [],
    page: 1,
    records: 0
  };

  try 
  {
    let url = axiosInstance.defaults.baseURL + '/baptisms?';
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

    response.data.data.forEach(baptism => {
      rows.push({
        id: baptism.id,
        ...baptism.attributes
      });
    });

    baptismData.rows = rows;
    baptismData.page = response.data.meta.page;
    baptismData.records = response.data.meta.records;
  }
  catch (error)
  {
    onErrorHandler(error.response)
  }
  finally
  {
    return baptismData;
  }
}

export const create = async (data, token) => {
  let response;
  try 
  {
    let url = axiosInstance.defaults.baseURL + '/baptisms';

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
    let url = axiosInstance.defaults.baseURL + `/baptisms/${data.id}`;
    data.id = undefined;

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
    let url = axiosInstance.defaults.baseURL + `/baptisms/${id}`;

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

export default {getBaptisms, create, update, deleteOne};