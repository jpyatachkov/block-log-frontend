import Vue from 'vue';
import Vuex from 'vuex';
import { VuexService } from '@/services';
import account from './modules/account';
import assignments from './modules/assignments';
import courses from './modules/courses';
import createPersistedState from 'vuex-persistedstate';
import solutions from './modules/solutions';

Vue.use(Vuex);

const state = {
  iframeLoading: true,
  layout: null,
  online: true,
};

const mutations = {
  setIframeLoading(state, loading) {
    state.iframeLoading = loading;
  },

  setLayout(state, layout) {
    state.layout = layout;
  },

  setOnline(state, online) {
    state.online = online;
  },
};

const getters = {
  iframeLoading(state) {
    return state.iframeLoading;
  },

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
      key: VuexService.VUEX_KEY,
      paths: [
        'assignments.assignment',
        'assignments.form',
        'courses.course',
        'solutions.sent',
      ],
    }),
  ],
  modules: {
    account,
    assignments,
    courses,
    solutions,
  },
});
