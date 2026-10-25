const cacheService = require("../services/cache.service");

/**
 * Route-level caching middleware.
 * Checks cache before reaching the controller. On cache miss, captures res.json and caches it.
 * 
 * @param {number} ttlSeconds - Cache TTL in seconds (default: 3600)
 * @param {Function} [keyGenerator] - Optional custom key generator (req) => string
 */
function cacheResponse(ttlSeconds = 3600, keyGenerator) {
    return async (req, res, next) => {

        if (req.method !== "GET") {
            return next();
        }

        const cacheKey = keyGenerator
            ? keyGenerator(req)
            : `cache:${req.baseUrl || ""}${req.path}:${JSON.stringify(req.query)}`;

        try {
            const cachedData = await cacheService.getCache(cacheKey);

            if (cachedData) {
                res.setHeader("X-Cache", "HIT");
                return res.status(200).json(cachedData);
            }

            res.setHeader("X-Cache", "MISS");
            const originalJson = res.json.bind(res);

            res.json = (body) => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    cacheService.setCache(cacheKey, body, ttlSeconds).catch((err) =>
                        console.error("[CacheMiddleware] Async set error:", err)
                    );
                }
                return originalJson(body);
            };

            next();
        } catch (error) {
            console.error("[CacheMiddleware] Error:", error);
            next();
        }
    };
}

module.exports = {
    cacheResponse,
    getCache: cacheService.getCache,
    setCache: cacheService.setCache,
    deleteCache: cacheService.deleteCache,
    deleteCachePattern: cacheService.deleteCachePattern,
    GetCachedData: cacheService.getCache,
    AppendCache: cacheService.setCache,
    InvalidateCache: cacheService.deleteCache
};
