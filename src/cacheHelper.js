import redis from "redis";
import settings from "./settings";

const { redis_host, redis_port } = settings.app;

const redisClient = redis.createClient({
  host: redis_host,
  port: redis_port,
});

/**
 * @description Update redis cache
 * @param {string} key key of the data
 * @param {string} value cache value
 * @param {number} ttl expire in seconds
 * @returns void
 */
const updateCache = (key, value, ttl = 3600) => {
  redisClient.setex(key, ttl, value);
};

/**
 * @description Fetch cache value
 * @param key key of the data
 * @returns {string} cached content
 */
const getFromCache = (key) =>
  new Promise((resolve, reject) => {
    redisClient.get(key, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });

/**
 * @description Flush cache after updates
 * @returns {void}
 */
const flushCacheDb = () =>
  new Promise((resolve, reject) => {
    redisClient.flushdb((err, succeeded) => {
      if (err) {
        reject(err);
      }

      resolve(succeeded);
    });
  });

export { updateCache, getFromCache, flushCacheDb };
