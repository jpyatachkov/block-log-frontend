import { getField, updateField } from 'vuex-map-fields';

import { ApiService } from '@/services';

const state = {
  title: '',
  description: '',
};

const actions = {
  async create({ state, commit, rootState }) {
    const course = {
      title: state.title,
      description: state.description,
    };

    const response = await ApiService.createCourse({ course });

    commit('courses/setItem', response, { root: true });

    return rootState.courses.course.id;
  },

  async update({ commit, rootState }) {
    const course = {
      title: state.title,
      description: state.description,
    };

    const response = await ApiService.updateCourse({ course });

    commit('courses/setItem', response, { root: true });

    return rootState.courses.course.id;
  },
};

const getters = {
  getField,
};

const mutations = {
  updateField,

  setForm(state, form) {
    state.title = form.title;
    state.description = form.description;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
