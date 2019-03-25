import { ApiService } from '@/services';

const state = {
  assignment: {},
  assignmentsCurrentPage: 0,
  assignments: {
    total: 0,
    items: [],
  },
};

const actions = {
  async get({ state, commit }, { courseId, size }) {
    if (
      state.assignmentsCurrentPage &&
      state.assignmentsCurrentPage >= state.assignments.total
    ) {
      return;
    }

    const response = await ApiService.getAssignments({
      courseId,
      page: state.assignmentsCurrentPage + 1,
      size,
    });

    commit('incrementAssignmentsPage');
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
  setItem(state, response) {
    state.assignment = response.assignment;
  },

  incrementAssignmentsPage(state) {
    state.assignmentsCurrentPage++;
  },

  addItems(state, assignments) {
    const { total, items } = assignments;

    state.assignments.total = total;
    state.assignments.items.push(...items);
  },

  clearItems(state) {
    state.assignmentsCurrentPage = 0;
    state.assignments = {
      total: 0,
      items: [],
    };
  },
};

const getters = {
  item(state) {
    return state.assignment;
  },

  items(state) {
    return state.assignments.items;
  },

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
