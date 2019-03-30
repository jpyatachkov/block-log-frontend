import { getCallbacksByEntity, getMutationNamesByEntity } from './helpers';

export function createCollectionGetAction(apiCallback, entityName) {
  const {
    currentPageCallback,
    isLoadingCallback,
    totalItemsCallback,
  } = getCallbacksByEntity(entityName);

  const {
    addName: addItemsMutationName,
    incrementName: incrementCurrentPageMutationName,
    setLoadingName: setLoadingMutationName,
  } = getMutationNamesByEntity(entityName);

  return async ({ state, commit }, payload) => {
    if (isLoadingCallback(state)) {
      return;
    }

    const { page } = payload;

    commit(setLoadingMutationName, true);

    const currentPage = currentPageCallback(state);
    const totalItems = totalItemsCallback(state);

    if (page === 1 && currentPage > page) {
      commit(setLoadingMutationName, false);
      return;
    }

    if (currentPage && currentPage >= totalItems) {
      commit(setLoadingMutationName, false);
      return;
    }

    const response = await apiCallback({ state }, payload);

    commit(incrementCurrentPageMutationName);
    commit(addItemsMutationName, response);
    commit(setLoadingMutationName, false);
  };
}
