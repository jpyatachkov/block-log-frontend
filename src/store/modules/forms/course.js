import { ApiService } from '@/services';
import { createItemFromFormSetter } from '@/store/utils';

const createEmptyState = () => ({
  title: '',
  description: '',
  unsaved: false,
});
const setItem = createItemFromFormSetter(
  'courses/setCourse',
  (rootState) => rootState.courses.course.id,
);

const state = createEmptyState();

const actions = {
  async create({ commit, rootState }, { course }) {
    const response = await ApiService.createCourse({ course });
    return setItem({ rootState, commit, response });
  },

  async update({ commit, rootState }, { courseId, course }) {
    const response = await ApiService.updateCourse({ courseId, course });
    return setItem({ rootState, commit, response });
  },
};

const getters = {
  data(state) {
    return {
      title: state.title,
      description: state.description,
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
    const { title, description } = form;

    state.title = title;
    state.description = description;
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
