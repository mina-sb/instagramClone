const localStorageHandler = {
  getItem: (key) => {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : null;
  },

  setItem: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
};

export default localStorageHandler;
