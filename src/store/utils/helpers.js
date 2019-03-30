import { capitalize } from '@/utils/helpers';

export function getCallbacksByEntity(entityName) {
  const { item, itemCurrentPage, itemLoading } = getCollectionAttrNamesByEntity(
    entityName,
  );

  return {
    currentPageCallback: (state) => state[itemCurrentPage],
    isLoadingCallback: (state) => state[itemLoading],
    totalItemsCallback: (state) => state[item].total,
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

export function getGetterNamesNyEntity(entityName) {
  const capitalized = capitalize(entityName);

  return {
    getName: `get${capitalized}`,
    getListName: `get${capitalized}List`,
    getTotalName: `get${capitalized}Total`,
  };
}

export function getMutationNamesByEntity(entityName) {
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
