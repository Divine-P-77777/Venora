const profileModel = require("../models/profile.model");
const { verifyAccessToken } = require("../utils/token.util");

/**
 * Universal Authentication Middleware
 * 1. Inspects HttpOnly cookie 'accessToken'
 * 2. Fallbacks to 'Authorization: Bearer <token>'
 * 3. Attaches populated 'req.user'
 */
const AuthenticateUser = async (req, res, next) => {
    try {
        let token = req.cookies?.accessToken;

        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ error: "Authentication required. Please login." });
        }

        // Verify native JWT
        try {
            const decoded = verifyAccessToken(token);
            const user = await profileModel.findById(decoded.userId).populate("role");

            if (!user) {
                return res.status(404).json({ error: "User profile not found in database" });
            }

            req.user = user;
            return next();
        } catch (jwtErr) {
            if (jwtErr.name === "TokenExpiredError") {
                return res.status(401).json({
                    error: "Access token has expired. Please refresh your session.",
                    code: "TOKEN_EXPIRED"
                });
            }
            return res.status(401).json({ error: "Invalid access token" });
        }
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(500).json({ error: "Internal server error during authentication" });
    }
};

module.exports = { AuthenticateUser };