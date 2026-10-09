const profileModel = require("../models/profile.model");
const { getAuth } = require("@clerk/express");

const AuthenticateAdmin = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Find user by their Clerk ID and populate their role
        const user = await profileModel.findOne({ clerkId: userId }).populate('role');

        if (!user) {
            return res.status(404).json({ error: 'User profile not found' });
        }

        if (!user.role || user.role.name !== "admin") {
            return res.status(403).json({ error: 'Access denied: Admin privileges required' });
        }

        // Attach user to req for downstream usage
        req.user = user;
        next();
    } catch (error) {
        console.error("Admin Authentication Error:", error);
        return res.status(500).json({ error: 'Internal server error during authentication' });
    }
};

module.exports = { AuthenticateAdmin };