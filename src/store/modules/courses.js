import '@/typedef';

import { ApiService } from '@/services';

/**
 * @typedef {Object} CoursesState
 * @property {Array<Course>} courses
 */

/**
 * @type {CoursesState}
 */
const state = {
  courses: [],
};

const actions = {
  async get({ commit }, { page, size }) {
    const response = await ApiService.getCourses({ page, size });
    commit('setItems', response);
  },
};

const mutations = {
  /**
   * @param {CoursesState} state
   * @param {Array<Course>} courses
   */
  setItems(state, courses) {
    state.courses = courses;
  },
};

const getters = {
  /**
   * @param {CoursesState} state
   * @returns {Array<Course>}
   */
  items(state) {
    return state.courses;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
