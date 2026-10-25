const redis = require("../utils/redis.util");

/**
 * @param {number} windowMs - Time window in milliseconds (e.g., 15 * 60 * 1000)
 * @param {number} maxRequests - Max requests allowed within windowMs
 * @param {string} [customPrefix] - Optional unique prefix (defaults to route path)
 */


const rateLimitMiddleware = (windowMs, maxRequests, customPrefix) => {
    const windowSeconds = Math.max(1, Math.ceil(windowMs / 1000));

    return async (req, res, next) => {
        // Resolve client IP (supporting reverse proxies)
        const forwarded = req.headers["x-forwarded-for"];
        const ip = forwarded ? forwarded.split(",")[0].trim() : (req.ip || req.socket.remoteAddress || "127.0.0.1");

        // Isolate counter by route path unless a custom prefix is given
        const routeKey = customPrefix || `${req.baseUrl || ""}${req.path || ""}`;
        const key = `rl:${routeKey}:${ip}`;

        try {
            // Increment the counter in Redis
            const currentCount = await redis.incr(key);

            // Set TTL only on initial creation to avoid continuously pushing back expiration
            if (currentCount === 1) {
                await redis.expire(key, windowSeconds);
            } else {
                // Safeguard: Ensure key has a TTL if created in a previous transient failure
                const ttl = await redis.ttl(key);
                if (ttl === -1) {
                    await redis.expire(key, windowSeconds);
                }
            }

            // Set standard RFC rate-limiting headers
            res.setHeader("X-RateLimit-Limit", maxRequests);
            res.setHeader("X-RateLimit-Remaining", Math.max(0, maxRequests - currentCount));

            if (currentCount > maxRequests) {
                const ttl = await redis.ttl(key);
                const retryAfter = ttl > 0 ? ttl : windowSeconds;

                res.setHeader("Retry-After", retryAfter);

                return res.status(429).json({
                    status: "error",
                    message: `Too many requests from this IP. Please try again after ${retryAfter} seconds.`,
                    retryAfter
                });
            }

            next();
        } catch (error) {

            console.error("Rate limiting error in Redis:", error);
            next();
        }
    };
};

module.exports = { rateLimitMiddleware };