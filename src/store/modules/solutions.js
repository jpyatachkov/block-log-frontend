import { ApiService } from '@/services';

const state = {
  solution: {},
  solutions: {
    total: 0,
    items: [],
  },
};

const actions = {
  async get({ commit }, { courseId, assignmentId, page, size }) {
    const response = await ApiService.getSolutions({
      courseId,
      assignmentId,
      page,
      size,
    });
    commit('setItems', response);
  },

  async getOne({ commit }, { solutionId }) {
    const response = await ApiService.getSolution({ solutionId });
    commit('setItem', response);
  },

  async create({ commit }, { solution }) {
    const response = await ApiService.createSolution({ solution });
    commit('setItem', response);
  },
};

const mutations = {
  setItem(state, solution) {
    state.solution = solution;
  },

  addItems(state, solutions) {
    const { total, items } = solutions;

    state.solutions.total += total;
    state.solutions.items.push(...items);
  },

  clearItems(state) {
    state.solutions = {
      total: 0,
      items: [],
    };
  },
};

const getters = {
  item(state) {
    return state.solution;
  },

  items(state) {
    return state.solutions.items;
  },

  total(state) {
    return state.solutions.total;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
