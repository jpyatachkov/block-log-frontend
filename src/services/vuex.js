import StorageService from './storage';

export default {
  ...StorageService,

  VUEX_KEY: 'vuex',

  clear() {
    this.__remove(this.VUEX_KEY);
  },
};
