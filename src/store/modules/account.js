import { ApiService } from '@/services';

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
  setUser(state, user) {
    state.user = user;
  },
};

const getters = {
  user(state) {
    return state.user;
  },

  userRoles() {
    return ApiService.userRoles();
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
