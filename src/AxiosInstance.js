import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASEURL;

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/vnd.api+json'
  }
});

export default instance;