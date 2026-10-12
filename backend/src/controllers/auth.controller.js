const authService = require("../services/auth.service");

async function profileRegister(req, res) {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password || !role) {
            return res.status(400).json({ error: "Username, email, password, and role are all required" });
        }

        const result = await authService.profileRegisterService({ username, email, password, role });

        return res.status(201).json({
            message: 'User registered successfully',
            user: result.userProfile
        });

    } catch (error) {
        console.error("Profile registration error:", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        if (error.errors && error.errors.length > 0) {
            return res.status(400).json({ error: error.errors[0].longMessage || error.errors[0].message });
        }

        return res.status(500).json({ error: "Internal server error during registration." });
    }
}

async function profileLogin(req, res) {
    return res.status(501).json({ message: "Login should be handled by Clerk Frontend SDK." });
}

async function profileLogout(req, res) {
    return res.status(501).json({ message: "Logout should be handled by Clerk Frontend SDK." });
}

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
    profileLogout,
    getProfile
};