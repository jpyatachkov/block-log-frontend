/**
 * Приводит строку к верхнему регистру.
 * @param {String} word
 * @returns {String}
 */
export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Возвращает полную высоту окна (с учетом прокрутки).
 * @returns {Number}
 */
export function getPageHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );
}

/**
 * Возвращает количество прокрученных пикселов.
 * @returns {Number}
 */
export function getScrollHeight() {
  return (
    window.innerHeight + window.pageYOffset ||
    document.documentElement.scrollTop
  );
}
