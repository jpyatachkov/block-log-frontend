import {
  createCollectionEmptyState,
  createCollectionGetAction,
  createCollectionGetters,
  createCollectionMutations,
  createEditStateEmptyState,
  createEditStateGetters,
  createEditStateMutations,
} from '@/store/utils';

import { ApiService } from '@/services';
import form from './forms/assignment';
import { getCollectionMutationNamesByEntity } from '@/store/utils/collection-state/helpers';

const ASSIGNMENT = 'assignment';

const state = {
  ...createCollectionEmptyState(ASSIGNMENT),
  ...createEditStateEmptyState(ASSIGNMENT),
};

const {
  clearName: clearMutationName,
  setName: setMutationName,
} = getCollectionMutationNamesByEntity(ASSIGNMENT);

const actions = {
  get: createCollectionGetAction(async ({ state }, { courseId, size }) => {
    return ApiService.getAssignments({
      courseId,
      page: state.assignmentCurrentPage + 1,
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
