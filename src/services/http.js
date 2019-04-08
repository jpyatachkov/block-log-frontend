import JwtService from './jwt';
import axios from 'axios';
import router from '@/router';

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
axios.defaults.headers = {
  'Content-Type': 'application/json',
};
axios.defaults.timeout = process.env.VUE_APP_API_TIMEOUT;

export default {
  ...JwtService,

  async __doRequest({
    url,
    method,
    headers,
    params,
    data,
    timeout,
    redirect = true,
  }) {
    headers = {
      ...headers,
      Authorization: `Bearer ${this.getToken()}`,
    };

    try {
      const response = await axios({
        url,
        method,
        headers,
        params,
        data,
        timeout,
      });
      return response;
    } catch (err) {
      switch (true) {
        case redirect && err.response.status === 401:
          JwtService.clearToken();
          router.push({ name: 'login' });
          break;
        case redirect && err.response.status === 404:
          router.push({ name: 'not_found' });
          break;
        default:
          break;
      }

      throw err;
    }
  },

  async doGet({ url, headers, params, timeout, redirect = true }) {
    return this.__doRequest({
      url,
      method: 'GET',
      headers,
      params,
      timeout,
      redirect,
    });
  },

  async doPost({ url, headers, data, timeout, redirect = true }) {
    return this.__doRequest({
      url,
      method: 'POST',
      headers,
      data,
      timeout,
      redirect,
    });
  },

  async doPatch({ url, headers, data, timeout, redirect = true }) {
    return this.__doRequest({
      url,
      method: 'PATCH',
      headers,
      data,
      timeout,
      redirect,
    });
  },

  async doDelete({ url, headers, timeout, redirect = true }) {
    return this.__doRequest({
      url,
      method: 'DELETE',
      headers,
      timeout,
      redirect,
    });
  },
};
