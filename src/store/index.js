import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account';
import assignments from './modules/assignments';
import courses from './modules/courses';
import solutions from './modules/solutions';

Vue.use(Vuex);

/**
 * @typedef {Object} RootState
 * @property {?string} layout
 * @property {boolean} online
 */

/** @type {RootState} */
const state = {
  layout: null,
  online: true,
};

const mutations = {
  /**
   * @param {RootState} state
   * @param {string} layout
   */
  setLayout(state, layout) {
    state.layout = layout;
  },

  /**
   * @param {RootState} state
   * @param {boolean} online
   */
  setOnline(state, online) {
    state.online = online;
  },
};

const getters = {
  /**
   * @param {RootState} state
   * @returns {boolean}
   */
  online(state) {
    return state.online;
  },

  /**
   * @param {RootState} state
   * @returns {boolean}
   */
  offline(state) {
    return !state.online;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  modules: {
    account,
    assignments,
    courses,
    solutions,
  },
});
