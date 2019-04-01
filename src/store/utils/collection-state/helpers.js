import { capitalize } from '@/utils/helpers';

export function getCollectionCallbacksByEntity(entityName) {
  const {
    itemCurrentPage,
    itemList,
    itemLoading,
  } = getCollectionAttrNamesByEntity(entityName);

  return {
    currentPageCallback: (state) => state[itemCurrentPage],
    isLoadingCallback: (state) => state[itemLoading],
    totalItemsCallback: (state) => state[itemList].total,
  };
}

export function getCollectionAttrNamesByEntity(entityName) {
  return {
    item: entityName,
    itemCurrentPage: `${entityName}CurrentPage`,
    itemLoading: `${entityName}Loading`,
    itemList: `${entityName}List`,
  };
}

export function getCollectionMutationNamesByEntity(entityName) {
  const capitalized = capitalize(entityName);

  return {
    addName: `add${capitalized}ListItems`,
    clearName: `clear${capitalized}`,
    clearListName: `clear${capitalized}List`,
    incrementName: `increment${capitalized}CurrentPage`,
    setLoadingName: `set${capitalized}Loading`,
    setName: `set${capitalized}`,
  };
}

export function getCollectionGetterNamesNyEntity(entityName) {
  const capitalized = capitalize(entityName);

  return {
    getName: `get${capitalized}`,
    getListName: `get${capitalized}List`,
    getTotalName: `get${capitalized}Total`,
  };
}
