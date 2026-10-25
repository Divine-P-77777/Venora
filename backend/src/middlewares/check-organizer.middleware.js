const organizerModel = require("../models/organizer.model");
const profileModel = require("../models/profile.model");

const AuthenticateApprovedOrg = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Check if this user is a registered organizer
        const organizer = await organizerModel.findOne({ org_id: user._id });
        if (!organizer) {
            return res.status(404).json({ error: 'Organizer profile not found' });
        }

        if (organizer.verificationStatus !== "approved") {
            return res.status(403).json({ error: 'Access denied: Organizer is not approved yet' });
        }

        // Attach organizer to req for downstream usage
        req.organizer = organizer;
        next();
    } catch (error) {
        console.error("Organizer Authentication Error:", error);
        return res.status(500).json({ error: 'Internal server error during authentication' });
    }
};

module.exports = { AuthenticateApprovedOrg };