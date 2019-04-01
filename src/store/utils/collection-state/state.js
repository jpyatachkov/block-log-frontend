import {
  getCollectionAttrNamesByEntity,
  getCollectionGetterNamesNyEntity,
  getCollectionMutationNamesByEntity,
} from './helpers';

export function createCollectionEmptyState(entityName) {
  const {
    item,
    itemCurrentPage,
    itemLoading,
    itemList,
  } = getCollectionAttrNamesByEntity(entityName);

  return {
    [item]: {},
    [itemCurrentPage]: 0,
    [itemLoading]: false,
    [itemList]: {
      total: 0,
      items: [],
    },
  };
}

export function createCollectionMutations(entityName) {
  const {
    item,
    itemCurrentPage,
    itemLoading,
    itemList,
  } = getCollectionAttrNamesByEntity(entityName);

  const addItems = (state, value) => {
    const { total, items } = value;

    state[itemList].total = total;
    state[itemList].items.push(...items);
  };
  const clear = (state) => {
    state[item] = {};
  };
  const clearItems = (state) => {
    const emptyState = createCollectionEmptyState(entityName);

    for (let attr in emptyState) {
      state[attr] = emptyState[attr];
    }
  };
  const incrementCurrentPage = (state) => {
    state[itemCurrentPage]++;
  };
  const setItem = (state, value) => {
    state[item] = value[item];
  };
  const setLoading = (state, value) => {
    state[itemLoading] = value;
  };

  const {
    addName,
    clearName,
    clearListName,
    incrementName,
    setLoadingName,
    setName,
  } = getCollectionMutationNamesByEntity(entityName);

  return {
    [addName]: addItems,
    [clearName]: clear,
    [clearListName]: clearItems,
    [incrementName]: incrementCurrentPage,
    [setLoadingName]: setLoading,
    [setName]: setItem,
  };
}

export function createCollectionGetters(entityName) {
  const { item, itemList } = getCollectionAttrNamesByEntity(entityName);

  const getItem = (state) => {
    return state[item];
  };
  const getItemList = (state) => {
    return state[itemList].items;
  };
  const getTotal = (state) => {
    return state[itemList].total;
  };

  const {
    getName,
    getListName,
    getTotalName,
  } = getCollectionGetterNamesNyEntity(entityName);

  return {
    [getName]: getItem,
    [getListName]: getItemList,
    [getTotalName]: getTotal,
  };
}

export function createItemFromFormSetter(mutationName, idFromRootCallback) {
  return ({ rootState, commit, response }) => {
    commit(mutationName, response, { root: true });
    return idFromRootCallback(rootState);
  };
}
