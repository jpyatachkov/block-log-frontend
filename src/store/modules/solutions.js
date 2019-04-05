import {
  createCollectionEmptyState,
  createCollectionGetAction,
  createCollectionGetters,
  createCollectionMutations,
} from '@/store/utils';

import { ApiService } from '@/services';
import { getCollectionCallbacksByEntity } from '@/store/utils/collection-state/helpers';

const SOLUTION = 'solution';

const state = () => ({
  ...createCollectionEmptyState(SOLUTION),
  sent: false,
});

const {
  currentPageCallback: solutionCurrentPage,
} = getCollectionCallbacksByEntity(SOLUTION);

const actions = {
  get: createCollectionGetAction(async ({ courseId, assignmentId, size }) => {
    return ApiService.getSolutions({
      courseId,
      assignmentId,
      page: solutionCurrentPage(state) + 1,
      size,
    });
  }),

  async getOne({ commit }, { solutionId }) {
    const response = await ApiService.getSolution({ solutionId });
    commit('setItem', response);
  },

  async create({ commit }, { solution }) {
    const response = await ApiService.createSolution({ solution });
    commit('setItem', response);
  },
};

const mutations = {
  ...createCollectionMutations(SOLUTION),

  setSent(state, sent) {
    state.sent = sent;
  },
};

const getters = {
  ...createCollectionGetters(SOLUTION),

  sent(state) {
    return state.sent;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
