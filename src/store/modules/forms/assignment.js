import { ApiService } from '@/services';

function setItem({ rootState, commit, response }) {
  commit('assignments/setItem', response, { root: true });
  return rootState.courses.course.id;
}

const state = {
  text: '',
  tests: [],
  unsaved: false,
};

const actions = {
  async create({ commit, rootState }, { courseId, assignment }) {
    const response = await ApiService.createAssignment({
      courseId,
      assignment,
    });
    return setItem({ rootState, commit, response });
  },

  async update({ commit, rootState }, { courseId, assignmentId, assignment }) {
    const response = await ApiService.updateAssignment({
      courseId,
      assignmentId,
      assignment,
    });
    return setItem({ rootState, commit, response });
  },
};

const getters = {
  data(state) {
    return {
      text: state.text,
      tests: state.tests,
    };
  },

  unsaved(state) {
    return state.unsaved;
  },
};

const mutations = {
  clear(state) {
    state.text = '';
    state.tests = [];
    state.unsaved = false;
  },

  set(state, form) {
    const { text, tests } = form;

    state.text = text;
    state.tests = tests;
    state.unsaved = true;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
