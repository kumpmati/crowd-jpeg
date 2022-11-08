import nodeCache from "node-cache";

let cache = new nodeCache({ stdTTL: 0 });

/**
 * Returns an item from cache. If the item does not exist,
 * the `get` function is run, and its return value cached and returned.
 */
export const getCached = async <T>(
  key: string,
  get: () => Promise<T>
): Promise<T> => {
  if (!cache.get(key)) {
    cache.set(key, await get());
  }

  return cache.get(key)!;
};
