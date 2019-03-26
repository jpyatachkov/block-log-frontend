import { getField, updateField } from 'vuex-map-fields';

import { ApiService } from '@/services';

const state = {
  title: '',
  description: '',
};

function payloadFromState(state) {
  return {
    title: state.title,
    description: state.description,
  };
}

function setItem({ rootState, commit, response }) {
  commit('courses/setItem', response, { root: true });
  return rootState.courses.course.id;
}

const actions = {
  async create({ state, commit, rootState }) {
    const course = payloadFromState(state);
    const response = await ApiService.createCourse({ course });
    return setItem({ rootState, commit, response });
  },

  async update({ commit, rootState }, { id }) {
    const course = payloadFromState(state);
    const response = await ApiService.updateCourse({ courseId: id, course });
    return setItem({ rootState, commit, response });
  },

  async fill({ commit }, { courseId }) {
    const response = await ApiService.getCourse({ courseId });
    commit('setForm', response);
  },
};

const getters = {
  getField,
};

const mutations = {
  updateField,

  clear(state) {
    state.title = '';
    state.description = '';
  },

  setForm(state, response) {
    const { title, description } = response.course;

    state.title = title;
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
