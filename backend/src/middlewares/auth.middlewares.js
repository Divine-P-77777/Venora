const { getAuth } = require('@clerk/express');
const profileModel = require("../models/profile.model");

const AuthenticateUser = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const user = await profileModel.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({ error: 'User profile not found in database' });
    }


    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ error: 'Internal server error during authentication' });
  }
};

module.exports = { AuthenticateUser };