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
    redirectOn404 = true,
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
        case redirectOn404 && err.response.status === 404:
          router.push({ name: 'not_found' });
      }

      throw err;
    }
  },

  async doGet({ url, headers, params, timeout, redirectOn404 = true }) {
    return this.__doRequest({
      url,
      method: 'GET',
      headers,
      params,
      timeout,
      redirectOn404,
    });
  },

  async doPost({ url, headers, data, timeout, redirectOn404 = true }) {
    return this.__doRequest({
      url,
      method: 'POST',
      headers,
      data,
      timeout,
      redirectOn404,
    });
  },

  async doPatch({ url, headers, data, timeout, redirectOn404 = true }) {
    return this.__doRequest({
      url,
      method: 'PATCH',
      headers,
      data,
      timeout,
      redirectOn404,
    });
  },

  async doDelete({ url, headers, timeout, redirectOn404 = true }) {
    return this.__doRequest({
      url,
      method: 'DELETE',
      headers,
      timeout,
      redirectOn404,
    });
  },
};
