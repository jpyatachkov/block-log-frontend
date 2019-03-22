/**
 * Приводит строку к верхнему регистру.
 * @param {String} word
 */
export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
