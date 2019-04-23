import { AccountService } from '@/services';

const state = () => ({
  user: {},
});

const actions = {
  async login(context, { auth }) {
    return AccountService.login({ auth });
  },

  async logout({ commit }) {
    await AccountService.logout();

    commit('assignments/clearAssignmentList', null, { root: true });
    commit('courses/clearCourseList', null, { root: true });
    commit('courses/clearMyCourseList', null, { root: true });
    commit('solutions/clearSolutionList', null, { root: true });
  },

  async me({ commit }) {
    const response = await AccountService.me();
    commit('setUser', response);
  },

  async register({ dispatch }, { user }) {
    const response = await AccountService.register({ user });

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
  canCreateCourses(state) {
    // Для того, чтобы значение свойства менялось и обзервер не кешировался.
    if (state.user.id) {
      return AccountService.userCanCreateCourses();
    } else {
      return false;
    }
  },

  displayName(state) {
    if (state.user && (state.user.firstName || state.user.lastName)) {
      return `${state.user.firstName} ${state.user.lastName}`.trim();
    } else {
      return 'Неизвестный Пользователь';
    }
  },

  isStaff() {
    return AccountService.userIsStaff();
  },

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
