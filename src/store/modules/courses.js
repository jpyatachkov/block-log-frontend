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
  courses: {
    total: 0,
    items: [],
  },
};

const actions = {
  async get({ commit }, { page, size }) {
    const response = await ApiService.getCourses({ page, size });
    commit('addItems', response);
  },

  async getOne({ commit }, { courseId }) {
    const response = await ApiService.getCourse({ courseId });
    commit('setItem', response);
  },

  async create({ commit }, { course }) {
    const response = await ApiService.createCourse({ course });
    commit('setItem', response);
  },

  async update({ commit }, { course }) {
    const response = await ApiService.updateCourse({ course });
    commit('setItem', response);
  },
};

const mutations = {
  setItem(state, response) {
    state.course = response.course;
  },

  /**
   * @param {CoursesState} state
   * @param {Array<Course>} courses
   */
  addItems(state, courses) {
    const { total, items } = courses;

    state.courses.total += total;
    state.courses.items.push(...items);
  },

  /**
   * @param {CoursesState} state
   */
  clearItems(state) {
    state.courses = {
      total: 0,
      items: [],
    };
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
    return state.courses.items;
  },

  /**
   * @param {CoursesState} state
   * @returns {number}
   */
  total(state) {
    return state.courses.total;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
