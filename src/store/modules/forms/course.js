import { ApiService } from '@/services';
import { createItemFromFormSetter } from '@/store/utils';

const createEmptyState = () => ({
  title: '',
  shortDescription: '',
  description: '',
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
      shortDescription: state.shortDescription,
      description: state.description,
    };
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
    const { title, shortDescription, description } = form;

    state.title = title;
    state.shortDescription = shortDescription;
    state.description = description;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
