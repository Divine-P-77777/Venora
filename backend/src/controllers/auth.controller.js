const authService = require("../services/auth.service");
const {
    googleSignUpService,
    googleLoginService
} = require("../services/googleauth.service");

const {
    getAccessTokenCookieOptions,
    getRefreshTokenCookieOptions,
    getClearCookieOptions
} = require("../utils/token.util");

/**
 * Handle new user registration with auto-login (sets HttpOnly cookies).
 */
async function profileRegister(req, res) {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password || !role) {
            return res.status(400).json({ error: "Username, email, password, and role are all required" });
        }

        const result = await authService.profileRegisterService({ username, email, password, role });

        // Set secure HttpOnly cookies
        res.cookie("accessToken", result.accessToken, getAccessTokenCookieOptions());
        res.cookie("refreshToken", result.refreshToken, getRefreshTokenCookieOptions());

        return res.status(201).json({
            message: "User registered successfully",
            user: result.user,
            accessToken: result.accessToken
        });
    } catch (error) {
        console.error("Profile registration error:", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error during registration." });
    }
}

/**
 * Handle user login and issue fresh Access + Refresh token cookies.
 */

async function profileLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email/username and password are required" });
        }

        const result = await authService.profileLoginService({ email, password });

        // Set secure HttpOnly cookies
        res.cookie("accessToken", result.accessToken, getAccessTokenCookieOptions());
        res.cookie("refreshToken", result.refreshToken, getRefreshTokenCookieOptions());

        return res.status(200).json({
            message: "Login successful",
            user: result.user,
            accessToken: result.accessToken
        });
    } catch (error) {
        console.error("Login error:", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error during login." });
    }
}


async function googleSignUp(req, res) {
    try {
        const { credential, role } = req.body;

        if (!credential) {
            return res.status(400).json({ error: "Google credential is required" });
        }

        const result = await googleSignUpService({ credential, role });

        // Set secure HttpOnly cookies
        res.cookie("accessToken", result.accessToken, getAccessTokenCookieOptions());
        res.cookie("refreshToken", result.refreshToken, getRefreshTokenCookieOptions());

        return res.status(201).json({
            message: "Google sign up successful",
            user: result.user,
            accessToken: result.accessToken
        });
    } catch (error) {
        console.error("Google signup error:", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error during Google signup." });
    }
}

async function googleLogin(req, res) {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({ error: "Google credential is required" });
        }

        const result = await googleLoginService({ credential });

        // Set secure HttpOnly cookies
        res.cookie("accessToken", result.accessToken, getAccessTokenCookieOptions());
        res.cookie("refreshToken", result.refreshToken, getRefreshTokenCookieOptions());

        return res.status(200).json({
            message: "Google login successful",
            user: result.user,
            accessToken: result.accessToken
        });
    } catch (error) {
        console.error("Google login error:", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error during Google login." });
    }
}
/**
 * Refresh access token using the HttpOnly refresh token cookie.
 */
async function refreshToken(req, res) {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

        if (!incomingRefreshToken) {
            return res.status(401).json({ error: "Refresh token is missing. Please login again." });
        }

        const result = await authService.refreshTokenService(incomingRefreshToken);

        // Update rotated cookies
        res.cookie("accessToken", result.accessToken, getAccessTokenCookieOptions());
        res.cookie("refreshToken", result.refreshToken, getRefreshTokenCookieOptions());

        return res.status(200).json({
            message: "Token refreshed successfully",

        });
    } catch (error) {
        console.error("Token refresh error:", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error while refreshing token." });
    }
}

/**
 * Logout user: invalidates refresh token in DB and clears both cookies.
 */
async function profileLogout(req, res) {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
        const userId = req.user?._id;

        await authService.profileLogoutService(userId, incomingRefreshToken);

        // Clear cookies from browser
        res.clearCookie("accessToken", getClearCookieOptions());
        res.clearCookie("refreshToken", getClearCookieOptions());

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ error: "Failed to logout cleanly." });
    }
}

/**
 * Fetch authenticated user profile.
 */
async function getProfile(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        return res.status(200).json({ user: req.user });
    } catch (error) {
        console.error("Get profile error:", error);
        return res.status(500).json({ error: "Failed to fetch profile." });
    }
}

module.exports = {
    profileRegister,
    profileLogin,
    googleLogin,
    googleSignUp,
    refreshToken,
    profileLogout,
    getProfile
};