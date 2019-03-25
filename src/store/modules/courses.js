import { ApiService } from '@/services';
import form from './forms/course';

const state = {
  course: {},
  coursesCurrentPage: 0,
  courses: {
    total: 0,
    items: [],
  },
  myCoursesCurrentPage: 0,
  myCourses: {
    total: 0,
    items: [],
  },
};

const actions = {
  async get({ state, commit }, { size }) {
    if (
      state.coursesCurrentPage &&
      state.coursesCurrentPage >= state.courses.total
    ) {
      return;
    }

    const response = await ApiService.getCourses({
      page: state.coursesCurrentPage + 1,
      size,
    });

    console.log('GET CALLED', state.coursesCurrentPage + 1);

    commit('incrementCoursesPage');
    commit('addItems', response);
  },

  async getMine({ state, commit }, { size }) {
    if (
      state.myCoursesCurrentPage &&
      state.myCoursesCurrentPage >= state.myCourses.total
    ) {
      return;
    }

    const response = await ApiService.getMyCourses({
      page: state.myCoursesCurrentPage + 1,
      size,
    });

    console.log('GET MINE CALLED', state.myCoursesCurrentPage + 1);

    commit('incrementMyCoursesPage');
    commit('addMyItems', response);
  },

  async getOne({ commit }, { courseId }) {
    const response = await ApiService.getCourse({ courseId });
    commit('setItem', response);
  },
};

const mutations = {
  setItem(state, response) {
    state.course = response.course;
  },

  incrementCoursesPage(state) {
    state.coursesCurrentPage++;
  },

  addItems(state, courses) {
    const { total, items } = courses;

    state.courses.total = total;
    state.courses.items.push(...items);
  },

  incrementMyCoursesPage(state) {
    state.myCoursesCurrentPage++;
  },

  addMyItems(state, myCourses) {
    const { total, items } = myCourses;

    state.myCourses.total = total;
    state.myCourses.items.push(...items);
  },

  clearItems(state) {
    state.coursesCurrentPage = 0;
    state.courses = {
      total: 0,
      items: [],
    };
  },

  clearMyItems(state) {
    state.myCoursesCurrentPage = 0;
    state.myCourses = {
      total: 0,
      items: [],
    };
  },
};

const getters = {
  item(state) {
    return state.course;
  },

  items(state) {
    return state.courses.items;
  },

  myItems(state) {
    return state.myCourses.items;
  },

  total(state) {
    return state.courses.total;
  },

  myTotal(state) {
    return state.myCourses.total;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
  modules: {
    form,
  },
};
