import ErrorHelper from "./errorHelper";
import logger from "./logger";
import { updateCache, flushCacheDb } from "./cacheHelper";

/**
 * @description Default error response for API requests
 * @param {Object} error - Error object
 * @param {*} response - Response object
 * @returns Reject Response with Error Object
 */
const defaultReject = async (error, response) => {
  const boomError = ErrorHelper({
    message: error.message,
    statusCode: error.code
  }).payload;

  const errorResponse = { ...boomError, stackTrace: error.stack };

  response.status(boomError.statusCode).json(boomError);

  // only 500 errors are unknow error which needs to be reported
  // other errors are handled
  if (boomError.statusCode >= 500) {
    await logger.log("error", "An Error Occurred", errorResponse);
  }
};

/**
 * @description Default success response for API requests
 * @param {*} response - Response Object
 * @param {Object} data - Returned Data object
 * @returns Resolved Response with Data
 */
const defaultResolve = async (response, data) => {
  // destructure cacheKey from response
  const { cacheKey, flushCache, ...payload } = data;
  response.status(200).json(payload);

  // updateCache
  if (cacheKey) {
    await updateCache(
      cacheKey,
      JSON.stringify({
        payload
      })
    );
  }

  if (flushCache) {
    // flush cache
    const result = await flushCacheDb();
    await logger.log("debug", `Cleared Cache: ${result.toString()}`);
  }
};

export { defaultResolve, defaultReject };
