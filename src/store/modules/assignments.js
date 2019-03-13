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
  assignments: [],
};

const actions = {
  async get({ commit }, { courseId, page, size }) {
    const response = await ApiService.getAssignments({ courseId, page, size });
    commit('setItems', response);
  },
};

const mutations = {
  /**
   * @param {AssignmentsState} state
   * @param {Array<Assignment>} assignments
   */
  setItems(state, assignments) {
    state.assignments = assignments;
  },
};

const getters = {
  /**
   * @param {AssignmentsState} state
   * @returns {Array<Assignment>}
   */
  items(state) {
    return state.assignments;
  },

  /**
   * @param {AssignmentsState} state
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
