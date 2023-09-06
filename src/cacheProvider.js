/**
 * Pass below an instance of the cache client of your choice
 * that implements SET, GET, HAS and DELETE methods.
 * @param {Object} provider
 * @returns
 */
export default (provider) => {
  /**
   * Sets a key-value pair in the cache.
   * @param {String} key
   * @param {any} item
   */
  const set = (key, item) => {
    provider.set(key, item);
  };

  const get = (key) => provider.get(key);

  const has = (key) => provider.has(key);

  const del = (key) => {
    provider.del(key);
  };

  return {
    get,
    set,
    has,
    del
  };
};
