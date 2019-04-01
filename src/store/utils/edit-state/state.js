import {
  getEditStateAttrNamesByEntity,
  getEditStateGetterNamesByEntity,
  getEditStateMutationNamesByEntity,
} from './helpers';

export function createEditStateEmptyState(entityName) {
  const { itemEditState } = getEditStateAttrNamesByEntity(entityName);

  return {
    [itemEditState]: [],
  };
}

export function createEditStateMutations(entityName) {
  const { itemEditState } = getEditStateAttrNamesByEntity(entityName);

  const changeEditState = (state, { id, isEditMode }) => {
    const idAsString = `${id}`;

    if (isEditMode) {
      state[itemEditState].push(idAsString);
    } else {
      state[itemEditState] = state[itemEditState].filter(
        (element) => element !== idAsString,
      );
    }
  };

  const { changeEditStateName } = getEditStateMutationNamesByEntity(entityName);

  return {
    [changeEditStateName]: changeEditState,
  };
}

export function createEditStateGetters(entityName) {
  const { itemEditState } = getEditStateAttrNamesByEntity(entityName);

  const getEditState = (state) => {
    return state[itemEditState];
  };

  const { getEditStateName } = getEditStateGetterNamesByEntity(entityName);

  return {
    [getEditStateName]: getEditState,
  };
}
