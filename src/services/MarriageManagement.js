import axiosInstance from '../AxiosInstance'
import {isEmpty, onErrorHandler} from './helpers'

export const getMarriages = async (query, token) => {
  let marriagesData = {
    rows: [],
    page: 1,
    records: 0
  };

  try 
  {
    let url = axiosInstance.defaults.baseURL + '/marriages?';
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

    response.data.data.forEach(marriage => {
      rows.push({
        id: marriage.id,
        ...marriage.attributes
      });
    });

    marriagesData.rows = rows;
    marriagesData.page = response.data.meta.page;
    marriagesData.records = response.data.meta.records;
  }
  catch (error)
  {
    onErrorHandler(error.response)
  }
  finally
  {
    return marriagesData;
  }
}

export const create = async (data, token) => {
  let response;
  try 
  {
    let url = axiosInstance.defaults.baseURL + '/marriages';

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
    let url = axiosInstance.defaults.baseURL + `/marriages/${data.id}`;
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
    let url = axiosInstance.defaults.baseURL + `/marriages/${id}`;

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

const MarriagesService = {getMarriages, create, update, deleteOne}
export default MarriagesService;