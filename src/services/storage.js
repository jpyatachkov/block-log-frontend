export default {
  __get(key, parse = true) {
    const value = localStorage.getItem(key);

    if (!value) {
      return null;
    }

    try {
      return parse ? JSON.parse(value) : value;
    } catch (err) {
      return null;
    }
  },

  __remove(key) {
    localStorage.removeItem(key);
  },

  __set(key, value, stringify = true) {
    const stringified = stringify ? JSON.stringify(value) : value;
    localStorage.setItem(key, stringified);
  },
};
