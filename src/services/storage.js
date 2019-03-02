const StorageService = {};

StorageService.get = function(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch (err) {
    return null;
  }
};

StorageService.remove = function(key) {
  localStorage.removeItem(key);
};

StorageService.set = function(key, value) {
  const stringified = JSON.stringify(value);
  localStorage.setItem(key, stringified);
};

export default StorageService;
