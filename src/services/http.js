import JwtService from './jwt';
import axios from 'axios';

axios.defaults = {
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: process.env.VUE_APP_API_TIMEOUT,
};

export default {
  ...JwtService,

  async __doRequest({ url, method, headers, params, data, timeout }) {
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
  },

  async doGet({ url, headers, params, timeout }) {
    return this.__doRequest({
      url,
      method: 'GET',
      headers,
      params,
      timeout,
    });
  },

  async doPost({ url, headers, data, timeout }) {
    return this.__doRequest({
      url,
      method: 'POST',
      headers,
      data,
      timeout,
    });
  },

  async doPatch({ url, headers, data, timeout }) {
    return this.__doRequest({
      url,
      method: 'PATCH',
      headers,
      data,
      timeout,
    });
  },

  async doDelete({ url, headers, timeout }) {
    return this.__doRequest({
      url,
      method: 'DELETE',
      headers,
      timeout,
    });
  },
};
