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

const SOLUTION = 'solution';

const state = () => ({
  ...createCollectionEmptyState(SOLUTION),
  sent: false,
});

const {
  currentPageCallback: solutionCurrentPage,
  totalItemsCallback: solutionListTotal,
} = getCollectionCallbacksByEntity(SOLUTION);

const { setName: setMutationName } = getCollectionMutationNamesByEntity(
  SOLUTION,
);

const actions = {
  get: createCollectionGetAction(
    async ({ state }, { courseId, assignmentId, size }) => {
      return ApiService.getSolutions({
        courseId,
        assignmentId,
        page: solutionCurrentPage(state) + 1,
        size,
      });
    },
    SOLUTION,
  ),

  async getOne({ commit }, { solutionId }) {
    const response = await ApiService.getSolution({ solutionId });
    commit(setMutationName, response);
  },

  async create({ commit }, { solution }) {
    const response = await ApiService.createSolution({ solution });
    console.log(response);
    commit(setMutationName, response);
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

  canLoadMore(state) {
    return solutionCurrentPage(state) < solutionListTotal(state);
  },

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
