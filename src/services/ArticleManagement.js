import axiosInstance from '../AxiosInstance'
import {isEmpty, onErrorHandler} from './helpers'

export const getArticles = async (query, token) => {
  let articlesData = {
    rows: [],
    page: 1,
    records: 0
  };

  try 
  {
    let url = axiosInstance.defaults.baseURL + '/articles?';
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

    response.data.data.forEach(article => {
      rows.push({
        id: article.id,
        ...article.attributes
      });
    });

    articlesData.rows = rows;
    articlesData.page = response.data.meta.page;
    articlesData.records = response.data.meta.records;
  }
  catch (error)
  {
    onErrorHandler(error.response)
  }
  finally
  {
    return articlesData;
  }
}

export const create = async (data, token) => {
  let response;
  try 
  {
    let url = axiosInstance.defaults.baseURL + '/articles';

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
    let url = axiosInstance.defaults.baseURL + `/articles/${data.id}`;
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
    let url = axiosInstance.defaults.baseURL + `/articles/${id}`;

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

export default {getArticles, create, update, deleteOne};