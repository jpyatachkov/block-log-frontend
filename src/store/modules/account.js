import { ApiService } from '@/services';

const state = {
  user: null,
};

const actions = {
  async login({ commit }, { userToken }) {
    const response = await ApiService.login({ userToken });

    if (response.isCorrect) {
      commit('setUser', response);
    }

    return response;
  },

  async logout() {
    ApiService.logout();
  },

  async register({ dispatch }, { user }) {
    const response = await ApiService.register({ user });

    if (response.isCorrect) {
      const userToken = {
        username: response.username,
        password: user.password,
      };
      await dispatch('login', { userToken });
    }

    return response;
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
