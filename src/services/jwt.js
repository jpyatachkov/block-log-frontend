import Base64Service from './base64';
import StorageService from './storage';

const JWT_KEY = 'jwt';

export default {
  ...Base64Service,
  ...StorageService,

  clearToken() {
    this.__remove(JWT_KEY);
  },

  getPayload() {
    const payload = this.getToken().split('.')[1];

    try {
      const decoded = this.decode(payload);
      return JSON.parse(decoded);
    } catch (error) {
      return {};
    }
  },

  getToken() {
    return this.__get(JWT_KEY, false) || '';
  },

  setToken(token) {
    return this.__set(JWT_KEY, token);
  },

  hasToken() {
    return !!this.getToken();
  },
};
