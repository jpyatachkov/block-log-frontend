import { ApiService } from '@/services';
import { createItemFromFormSetter } from '@/store/utils';

const createEmptyState = () => ({
  text: '',
  tests: [],
  unsaved: false,
});
const setItem = createItemFromFormSetter(
  'assignments/setAssignment',
  (rootState) => rootState.assignments.assignment.id,
);

const state = createEmptyState();

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
    state = {
      ...state,
      ...createEmptyState(),
    };
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
