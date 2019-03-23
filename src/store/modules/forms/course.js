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

  async update({ commit, rootState }, { id }) {
    const course = {
      title: state.title,
      description: state.description,
    };

    const response = await ApiService.updateCourse({ courseId: id, course });

    console.log(response);

    commit('courses/setItem', response, { root: true });

    return rootState.courses.course.id;
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
