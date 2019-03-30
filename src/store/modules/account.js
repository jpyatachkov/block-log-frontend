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

    commit('assignments/clearAssignmentList', null, { root: true });
    commit('courses/clearCourseList', null, { root: true });
    commit('courses/clearMyCourseList', null, { root: true });
    commit('solutions/clearItems', null, { root: true });
  },

  async me({ commit }) {
    const response = await ApiService.me();
    commit('setUser', response);
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
  setUser(state, response) {
    state.user = response.user;
  },
};

const getters = {
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
