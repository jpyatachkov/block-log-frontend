import {
  createCollectionEmptyState,
  createCollectionGetAction,
  createCollectionGetters,
  createCollectionMutations,
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
const MY_ACTIVE_COURSE = 'myActiveCourse';
const MY_INACTIVE_COURSE = 'myInactiveCourse';

const state = () => ({
  ...createCollectionEmptyState(COURSE),
  ...createCollectionEmptyState(MY_ACTIVE_COURSE),
  ...createCollectionEmptyState(MY_INACTIVE_COURSE),
});

const {
  clearName: clearMutationName,
  setName: setMutationName,
} = getCollectionMutationNamesByEntity(COURSE);

const {
  currentPageCallback: courseCurrentPage,
} = getCollectionCallbacksByEntity(COURSE);
const {
  currentPageCallback: myActiveCourseCurrentPage,
} = getCollectionCallbacksByEntity(MY_ACTIVE_COURSE);
const {
  currentPageCallback: myInactiveCourseCurrentPage,
} = getCollectionCallbacksByEntity(MY_INACTIVE_COURSE);

const actions = {
  get: createCollectionGetAction(async ({ state }, { size }) => {
    return ApiService.getCourses({
      page: courseCurrentPage(state) + 1,
      size,
    });
  }, COURSE),

  getMineActive: createCollectionGetAction(async ({ state }, { size }) => {
    return ApiService.getMyActiveCourses({
      page: myActiveCourseCurrentPage(state) + 1,
      size,
    });
  }, MY_ACTIVE_COURSE),

  getMineInactive: createCollectionGetAction(async ({ state }, { size }) => {
    return ApiService.getMyInactiveCourses({
      page: myInactiveCourseCurrentPage(state) + 1,
      size,
    });
  }, MY_INACTIVE_COURSE),

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

const {
  clearListName: clearMyActiveCoursesMutationName,
} = getCollectionMutationNamesByEntity(MY_ACTIVE_COURSE);
const {
  clearListName: clearMyInactiveCoursesMutationName,
} = getCollectionMutationNamesByEntity(MY_INACTIVE_COURSE);

const {
  [clearMyActiveCoursesMutationName]: clearActive,
} = createCollectionMutations(MY_ACTIVE_COURSE);

const {
  [clearMyInactiveCoursesMutationName]: clearInactive,
} = createCollectionMutations(MY_INACTIVE_COURSE);

const mutations = {
  ...createCollectionMutations(COURSE),
  ...createCollectionMutations(MY_ACTIVE_COURSE),
  ...createCollectionMutations(MY_INACTIVE_COURSE),

  clearMyCourseList(state) {
    clearActive(state);
    clearInactive(state);
  },
};

const getters = {
  ...createCollectionGetters(COURSE),
  ...createCollectionGetters(MY_ACTIVE_COURSE),
  ...createCollectionGetters(MY_INACTIVE_COURSE),

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
