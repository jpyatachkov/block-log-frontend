import {
  createCollectionEmptyState,
  createCollectionGetAction,
  createCollectionGetters,
  createCollectionMutations,
  createEditStateEmptyState,
  createEditStateGetters,
  createEditStateMutations,
} from '@/store/utils';
import {
  getCollectionCallbacksByEntity,
  getCollectionMutationNamesByEntity,
} from '@/store/utils/collection-state/helpers';

import { ApiService } from '@/services';
import form from './forms/course';

/**
 * @param {*} state
 * @returns {Array}
 */
function getUserRights(state) {
  return state.course.userRights || [];
}

const COURSE = 'course';
const MY_COURSE = 'myCourse';

const state = () => ({
  ...createCollectionEmptyState(COURSE),
  ...createCollectionEmptyState(MY_COURSE),
  ...createEditStateEmptyState(COURSE),
});

const {
  clearName: clearMutationName,
  setName: setMutationName,
} = getCollectionMutationNamesByEntity(COURSE);

const {
  currentPageCallback: courseCurrentPage,
} = getCollectionCallbacksByEntity(COURSE);
const {
  currentPageCallback: myCourseCurrentPage,
} = getCollectionCallbacksByEntity(MY_COURSE);

const actions = {
  get: createCollectionGetAction(async ({ state }, { size }) => {
    return ApiService.getCourses({
      page: courseCurrentPage(state) + 1,
      size,
    });
  }, COURSE),

  getMine: createCollectionGetAction(async ({ state }, { size }) => {
    return ApiService.getMyCourses({
      page: myCourseCurrentPage(state) + 1,
      size,
    });
  }, MY_COURSE),

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
  ...createCollectionMutations(COURSE),
  ...createCollectionMutations(MY_COURSE),
  ...createEditStateMutations(COURSE),
};

const getters = {
  ...createCollectionGetters(COURSE),
  ...createCollectionGetters(MY_COURSE),
  ...createEditStateGetters(COURSE),

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
