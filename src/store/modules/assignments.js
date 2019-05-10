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

  // Для того, чтобы отслеживать, какая задача решается при возврате.
  assignmentIndex: null,
});

const {
  clearName: clearMutationName,
  setName: setMutationName,
} = getCollectionMutationNamesByEntity(ASSIGNMENT);

const {
  currentPageCallback: assignmentCurrentPage,
  totalItemsCallback: assignmentListTotal,
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
    commit('deleteById', { id: assignmentId });
  },
};

const mutations = {
  ...createCollectionMutations(ASSIGNMENT),
  ...createEditStateMutations(ASSIGNMENT),

  addToEnd(state, { response }) {
    if (!state.assignmentList) {
      return;
    }

    const assignment = response.assignment;

    state.assignmentList = {
      total: state.assignmentList.total,
      items: [assignment, ...state.assignmentList.items],
    };
  },

  updateById(state, { id, response }) {
    if (!state.assignmentList) {
      return;
    }

    id = parseInt(id);
    const assignment = response.assignment;

    state.assignmentList = {
      total: state.assignmentList.total,
      items: state.assignmentList.items.map((a) => {
        if (a.id === id) {
          return assignment;
        } else {
          return a;
        }
      }),
    };
  },

  deleteById(state, { id }) {
    if (!state.assignmentList) {
      return;
    }

    id = parseInt(id);

    state.assignmentList.items = state.assignmentList.items.filter(
      (a) => a.id !== id,
    );
  },

  setAssignmentIndex(state, { idx }) {
    state.assignmentIndex = idx;
  },
};

const getters = {
  ...createCollectionGetters(ASSIGNMENT),
  ...createEditStateGetters(ASSIGNMENT),

  canLoadMore(state) {
    return assignmentCurrentPage(state) < assignmentListTotal(state);
  },

  assignmentIndex(state) {
    return state.assignmentIndex;
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
