const redis = require("../utils/redis.util");

/**
 * Safely parse data from Redis (Upstash Redis can return string or already-parsed object)
 */
function safeDeserialize(data) {
    if (data === null || data === undefined) return null;
    if (typeof data === "object") return data;
    try {
        return JSON.parse(data);
    } catch {
        return data;
    }
}

/**
 * Fetch cached data by key
 * @param {string} key 
 * @returns {Promise<any|null>}
 */
async function getCache(key) {
    try {
        const data = await redis.get(key);
        return safeDeserialize(data);
    } catch (error) {
        console.error(`[Redis] Get cache error for key "${key}":`, error.message);
        return null; // Fail-open: database handles the query on Redis error
    }
}

/**
 * Store data in cache with TTL in seconds
 * @param {string} key 
 * @param {any} data 
 * @param {number} ttlSeconds - Expiration time in seconds (default: 3600 = 1 hr)
 */
async function setCache(key, data, ttlSeconds = 3600) {
    try {
        if (data === null || data === undefined) return;
        const payload = typeof data === "string" ? data : JSON.stringify(data);
        await redis.setex(key, ttlSeconds, payload);
    } catch (error) {
        console.error(`[Redis] Set cache error for key "${key}":`, error.message);
    }
}

/**
 * Delete a specific key from cache
 * @param {string} key 
 */
async function deleteCache(key) {
    try {
        await redis.del(key);
    } catch (error) {
        console.error(`[Redis] Delete cache error for key "${key}":`, error.message);
    }
}

/**
 * Delete all keys matching a wildcard pattern (e.g. "events:list:*")
 * @param {string} pattern 
 */
async function deleteCachePattern(pattern) {
    try {
        const keys = await redis.keys(pattern);
        if (keys && keys.length > 0) {
            await Promise.all(keys.map((k) => redis.del(k)));
        }
    } catch (error) {
        console.error(`[Redis] Delete pattern error for "${pattern}":`, error.message);
    }
}

module.exports = {
    getCache,
    setCache,
    deleteCache,
    deleteCachePattern
};
