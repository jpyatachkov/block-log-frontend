import '@/typedef';

import { ApiService } from '@/services';

/**
 * @typedef {Object} AuthState
 * @property {User} user
 */

/** @type AuthState */
const state = {
  user: {},
};

const actions = {
  async login(context, { auth }) {
    return ApiService.login({ auth });
  },

  async logout() {
    return ApiService.logout();
  },

  async register({ dispatch }, { user }) {
    const response = await ApiService.register({ user });

    const auth = {
      username: response.username,
      password: user.password,
    };
    await dispatch('login', { auth });

    return response;
  },
};

const mutations = {
  /**
   * @param {AuthState} state
   * @param {User} user
   */
  setUser(state, user) {
    state.user = user;
  },
};

const getters = {
  /**
   * @param {AccountState} state
   * @returns {User}
   */
  user(state) {
    return state.user;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
