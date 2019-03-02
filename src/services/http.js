import JwtService from './jwt';
import axios from 'axios';

axios.defaults = {
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: process.env.VUE_APP_API_TIMEOUT,
};

const HttpService = {};

Object.assign(HttpService, JwtService);

HttpService.__doRequest = async function({
  url,
  method,
  headers,
  params,
  data,
  timeout,
}) {
  headers = {
    ...headers,
    Authorization: `Bearer ${this.getToken()}`,
  };
  return axios({
    url,
    method,
    headers,
    params,
    data,
    timeout,
    transformResponse: [
      (data) => {
        data.isCorrect = !!data.errors;
        return data;
      },
    ],
  });
};

HttpService.doGet = async function({ url, headers, params, timeout }) {
  return this.__doRequest({
    url,
    method: 'GET',
    headers,
    params,
    timeout,
  });
};

HttpService.doPost = async function({ url, headers, data, timeout }) {
  return this.__doRequest({
    url,
    method: 'POST',
    headers,
    data,
    timeout,
  });
};

HttpService.doPatch = async function({ url, headers, data, timeout }) {
  return this.__doRequest({
    url,
    method: 'PATCH',
    headers,
    data,
    timeout,
  });
};

HttpService.doDelete = async function({ url, headers, timeout }) {
  return this.__doRequest({
    url,
    method: 'DELETE',
    headers,
    timeout,
  });
};

export default HttpService;
