const profileModel = require("../models/profile.model");

const AuthenticateAdmin = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const roleName = user.role?.name;
        if (!roleName || (roleName !== "admin" && roleName !== "super-admin")) {
            return res.status(403).json({ error: 'Access denied: Admin privileges required' });
        }

        next();
    } catch (error) {
        console.error("Admin Authentication Error:", error);
        return res.status(500).json({ error: 'Internal server error during authentication' });
    }
};

module.exports = { AuthenticateAdmin };