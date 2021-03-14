import axiosInstance from '../AxiosInstance'
import {isEmpty, onErrorHandler} from './helpers'

export const getConfirmations = async (query, token) => {
  let confirmationData = {
    rows: [],
    page: 1,
    records: 0
  };

  try 
  {
    let url = axiosInstance.defaults.baseURL + '/confirmations?';
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

    response.data.data.forEach(confirmation => {
      rows.push({
        id: confirmation.id,
        ...confirmation.attributes
      });
    });

    confirmationData.rows = rows;
    confirmationData.page = response.data.meta.page;
    confirmationData.records = response.data.meta.records;
  }
  catch (error)
  {
    onErrorHandler(error.response)
  }
  finally
  {
    return confirmationData;
  }
}

export const create = async (data, token) => {
  let response;
  try 
  {
    let url = axiosInstance.defaults.baseURL + '/confirmations';

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
    let url = axiosInstance.defaults.baseURL + `/confirmations/${data.id}`;
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
    let url = axiosInstance.defaults.baseURL + `/confirmations/${id}`;

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

const ConfirmationService = {getConfirmations, create, update, deleteOne}
export default ConfirmationService;