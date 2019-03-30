import {
  createCollectionEmptyState,
  createCollectionGetAction,
  createCollectionGetters,
  createCollectionMutations,
} from '@/store/utils';

import { ApiService } from '@/services';
import form from './forms/assignment';
import { getMutationNamesByEntity } from '@/store/utils/helpers';

const state = {
  ...createCollectionEmptyState('assignment'),
};

const {
  clearName: clearMutationName,
  setName: setMutationName,
} = getMutationNamesByEntity('assignment');

const actions = {
  get: createCollectionGetAction(async ({ state }, { courseId, size }) => {
    return ApiService.getAssignments({
      courseId,
      page: state.assignmentsCurrentPage + 1,
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
  ...createCollectionMutations('assignment'),
};

const getters = {
  ...createCollectionGetters('assignment'),
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
