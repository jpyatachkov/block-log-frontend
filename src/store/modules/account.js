import { ApiService } from '@/services';

const state = {
  user: {},
};

const actions = {
  async login(context, { auth }) {
    return ApiService.login({ auth });
  },

  async logout({ commit }) {
    await ApiService.logout();

    commit('assignments/clearItems', null, { root: true });
    commit('courses/clearItems', null, { root: true });
    commit('courses/clearMyItems', null, { root: true });
    commit('solutions/clearItems', null, { root: true });
  },

  async register({ dispatch }, { user }) {
    const response = await ApiService.register({ user });

    const auth = {
      username: response.user.username,
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
