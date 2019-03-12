export default {
  __get(key) {
    const value = localStorage.getItem(key);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch (err) {
      return null;
    }
  },

  __remove(key) {
    localStorage.removeItem(key);
  },

  __set(key, value) {
    const stringified = JSON.stringify(value);
    localStorage.setItem(key, stringified);
  },
};
