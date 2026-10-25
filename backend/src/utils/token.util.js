const jwt = require("jsonwebtoken");
const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACCESS_EXPIRY,
    JWT_REFRESH_EXPIRY
} = require("../config/config");



/**
 * Generate a short-lived access token.
 * Payload: { userId, role }
 */
const generateAccessToken = (payload) => {
    return jwt.sign(payload, JWT_ACCESS_SECRET, {
        expiresIn: JWT_ACCESS_EXPIRY
    });
};



/**
 * Generate a long-lived refresh token.
 * Payload: { userId }
 */
const generateRefreshToken = (payload) => {
    return jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRY
    });
};



/**
 * Verify access token signature and expiry.
 */
const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_ACCESS_SECRET);
};


/**
 * Verify refresh token signature and expiry.
 */
const verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
};



/**
 * Cookie options tailored for production security:
 * - httpOnly: Blocks document.cookie access in browser (stops XSS token theft)
 * - secure: Transmitted exclusively over HTTPS in production
 * - sameSite: Mitigates Cross-Site Request Forgery (CSRF)
 */


const getAccessTokenCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000 // 15 minutes in milliseconds
});

const getRefreshTokenCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
});

const getClearCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
});

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    getAccessTokenCookieOptions,
    getRefreshTokenCookieOptions,
    getClearCookieOptions
};
