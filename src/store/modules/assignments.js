import '@/typedef';

import { ApiService } from '@/services';

/**
 * @typedef {Object} AssignmentsState
 * @property {Array<Assignment>} assignments
 */

/**
 * @type {AssignmentsState}
 */
const state = {
  assignment: {},
  assignments: {
    total: 0,
    items: [],
  },
};

const actions = {
  async get({ commit }, { courseId, page, size }) {
    const response = await ApiService.getAssignments({ courseId, page, size });
    commit('addItems', response);
  },

  async getOne({ commit }, { courseId, assignmentId }) {
    const response = await ApiService.getAssignment({ courseId, assignmentId });
    commit('setItem', response);
  },

  async create({ commit }, { courseId, assignment }) {
    const response = await ApiService.createAssignment({
      courseId,
      assignment,
    });
    commit('setItem', response);
  },

  async update({ commit }, { courseId, assignmentId, assignment }) {
    const response = await ApiService.updateAssignment({
      courseId,
      assignmentId,
      assignment,
    });
    commit('setItem', response);
  },
};

const mutations = {
  /**
   * @param {AssignmentsState} state
   * @param {Array<Assignment>} assignments
   */
  addItems(state, assignments) {
    const { total, items } = assignments;

    state.assignments.total += total;
    state.assignments.items.push(...items);
  },

  clearItems(state) {
    state.assignments = {
      total: 0,
      items: [],
    };
  },

  setItem(state, assignment) {
    state.assignment = assignment;
  },
};

const getters = {
  item(state) {
    return state.assignment;
  },

  /**
   * @param {AssignmentsState} state
   * @returns {Array<Assignment>}
   */
  items(state) {
    return state.assignments.items;
  },

  /**
   * @param {AssignmentsState} state
   * @returns {number}
   */
  total(state) {
    return state.assignments.total;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
