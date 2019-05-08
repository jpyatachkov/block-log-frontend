import { ApiService } from '@/services';
import { createItemFromFormSetter } from '@/store/utils';

/**
 * Поле program хранится в localStorage и доступно через EditorService.
 */
const createEmptyState = () => ({
  title: '',
  description: '',
  inputs: [],
  outputs: [],
  unsaved: false,
  visited: false,
});
const setItem = createItemFromFormSetter(
  'assignments/setAssignment',
  (rootState) => rootState.assignments.assignment.id,
);

const state = () => ({
  ...createEmptyState(),
});

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
    commit(
      'assignments/updateById',
      { id: assignmentId, response },
      { root: true },
    );
    return setItem({ rootState, commit, response });
  },
};

const getters = {
  data(state) {
    return {
      title: state.title,
      description: state.description,
      inputs: state.inputs,
      outputs: state.outputs,
    };
  },

  unsaved(state) {
    return state.unsaved;
  },

  visited(state) {
    return state.visited;
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
    const { title, description, inputs, outputs } = form;

    state.title = title;
    state.description = description;
    state.inputs = inputs;
    state.outputs = outputs;
    state.unsaved = true;
  },

  setVisited(state, visited) {
    state.visited = visited;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
