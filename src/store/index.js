import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account';
import assignments from './modules/assignments';
import courses from './modules/courses';
import createPersistedState from 'vuex-persistedstate';
import solutions from './modules/solutions';

Vue.use(Vuex);

const state = {
  layout: null,
  online: true,
};

const mutations = {
  setLayout(state, layout) {
    state.layout = layout;
  },

  setOnline(state, online) {
    state.online = online;
  },
};

const getters = {
  online(state) {
    return state.online;
  },

  offline(state) {
    return !state.online;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins: [
    createPersistedState({
      paths: ['assignments.form', 'solutions.sent'],
    }),
  ],
  modules: {
    account,
    assignments,
    courses,
    solutions,
  },
});
