import '@/typedef';

import { ApiService } from '@/services';

/**
 * @typedef {Object} CoursesState
 * @property {Course} course
 * @property {Array<Course>} courses
 */

/**
 * @type {CoursesState}
 */
const state = {
  course: {},
  courses: [],
};

const actions = {
  async get({ commit }, { page, size }) {
    const response = await ApiService.getCourses({ page, size });
    commit('setItems', response);
  },

  async getOne({ commit }, { courseId }) {
    const response = await ApiService.getCourse({ courseId });
    commit('setItem', response);
  },
};

const mutations = {
  /**
   * @param {CoursesState} state
   * @param {Course} course
   */
  setItem(state, course) {
    state.course = course;
  },

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
   * @returns {Course}
   */
  item(state) {
    return state.course;
  },

  /**
   * @param {CoursesState} state
   * @returns {Array<Course>}
   */
  items(state) {
    return state.courses;
  },

  /**
   * @param {CoursesState} state
   * @returns {number}
   */
  total(state) {
    return 5;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
