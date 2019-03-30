import {
  createCollectionEmptyState,
  createCollectionGetAction,
  createCollectionGetters,
  createCollectionMutations,
} from '@/store/utils';

import { ApiService } from '@/services';
import form from './forms/course';
import { getMutationNamesByEntity } from '@/store/utils/helpers';

/**
 * @param {*} state
 * @returns {Array}
 */
function getUserRights(state) {
  return state.course.userRights || [];
}

const state = {
  ...createCollectionEmptyState('course'),
  ...createCollectionEmptyState('myCourse'),
};

const {
  clearName: clearMutationName,
  setName: setMutationName,
} = getMutationNamesByEntity('course');

const actions = {
  get: createCollectionGetAction(async ({ size }) => {
    return ApiService.getCourses({
      page: state.courseCurrentPage + 1,
      size,
    });
  }, 'course'),

  getMine: createCollectionGetAction(async ({ size }) => {
    return ApiService.getMyCourses({
      page: state.myCourseCurrentPage + 1,
      size,
    });
  }, 'myCourse'),

  async getOne({ commit }, { courseId }) {
    const response = await ApiService.getCourse({ courseId });
    commit(setMutationName, response);
    return response.course;
  },

  async enroll({ dispatch }, { courseId }) {
    await ApiService.enrollCourse({ courseId });
    dispatch('getOne', { courseId });
  },

  async delete({ commit }, { courseId }) {
    await ApiService.deleteCourse({ courseId });
    commit(clearMutationName);
  },
};

const mutations = {
  ...createCollectionMutations('course'),
  ...createCollectionMutations('myCourse'),
};

const getters = {
  ...createCollectionGetters('course'),
  ...createCollectionGetters('myCourse'),

  userIsEnrolled(state) {
    return getUserRights(state).includes('user');
  },

  userIsCollaborator(state) {
    return getUserRights(state).includes('collaborator');
  },

  userIsModerator(state) {
    return getUserRights(state).includes('moderator');
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
