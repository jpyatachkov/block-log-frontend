import StorageService from './storage';

const JWT_KEY = 'jwt';

export default {
  ...StorageService,

  clearToken() {
    this.__remove(JWT_KEY);
  },

  getToken() {
    return this.__get(JWT_KEY);
  },

  setToken(token) {
    return this.__set(JWT_KEY, token);
  },

  hasToken() {
    return !!this.getToken();
  },
};
