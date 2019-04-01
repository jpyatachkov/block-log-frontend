import { capitalize } from '@/utils/helpers';

export function getEditStateAttrNamesByEntity(entityName) {
  return {
    itemEditState: `${entityName}EditState`,
  };
}

export function getEditStateMutationNamesByEntity(entityName) {
  const capitalized = capitalize(entityName);

  return {
    changeEditStateName: `change${capitalized}EditState`,
  };
}

export function getEditStateGetterNamesByEntity(entityName) {
  const capitalized = capitalize(entityName);

  return {
    getEditStateName: `get${capitalized}EditState`,
  };
}
