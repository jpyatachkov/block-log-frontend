import { ApiService } from '@/services';
import { createItemFromFormSetter } from '@/store/utils';

/**
 * Поле program хранится в localStorage и доступно через EditorService.
 */
const createEmptyState = () => ({
  title: '',
  description: '',
  inputs: [],
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
      title: state.text,
      description: state.description,
      inputs: state.inputs,
    };
  },

  unsaved(state) {
    return state.unsaved;
  },
};

const mutations = {
  clear(state) {
    const emptyState = createEmptyState();

    for (let attr in emptyState) {
      state[attr] = emptyState[attr];
    }
  },

  set(state, form) {
    const { title, description, inputs } = form;

    state.title = title;
    state.description = description;
    state.inputs = inputs;
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
