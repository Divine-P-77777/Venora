const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_PRESET_NAME: process.env.CLOUDINARY_PRESENT_NAME,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "venora_jwt_access_fallback_secret_key",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "venora_jwt_refresh_fallback_secret_key",
    JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY || "15m",
    JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || "7d",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,

    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL || " ",
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || "",

    RATELIMIT_WINDOW_MS: process.env.RATELIMIT_WINDOW_MS || "60 * 60 * 1000",
    RATELIMIT_MAX_REQUESTS: process.env.RATELIMIT_MAX_REQUESTS || "10",
}   