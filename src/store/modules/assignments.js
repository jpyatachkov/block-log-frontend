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
import form from './forms/assignment';

const ASSIGNMENT = 'assignment';

const state = () => ({
  ...createCollectionEmptyState(ASSIGNMENT),
  ...createEditStateEmptyState(ASSIGNMENT),
});

const {
  clearName: clearMutationName,
  setName: setMutationName,
} = getCollectionMutationNamesByEntity(ASSIGNMENT);

const {
  currentPageCallback: assignmentCurrentPage,
} = getCollectionCallbacksByEntity(ASSIGNMENT);

const actions = {
  get: createCollectionGetAction(async ({ state }, { courseId, size }) => {
    return ApiService.getAssignments({
      courseId,
      page: assignmentCurrentPage(state) + 1,
      size,
    });
  }, 'assignment'),

  async getOne({ commit }, { courseId, assignmentId }) {
    const response = await ApiService.getAssignment({ courseId, assignmentId });
    commit(setMutationName, response);
    return response.assignment;
  },

  async delete({ commit }, { courseId, assignmentId }) {
    await ApiService.deleteAssignment({ courseId, assignmentId });
    commit(clearMutationName);
  },
};

const mutations = {
  ...createCollectionMutations(ASSIGNMENT),
  ...createEditStateMutations(ASSIGNMENT),
};

const getters = {
  ...createCollectionGetters(ASSIGNMENT),
  ...createEditStateGetters(ASSIGNMENT),
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
