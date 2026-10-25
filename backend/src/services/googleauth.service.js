const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto");
const mongoose = require("mongoose");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const profileModel = require("../models/profile.model");
const roleModel = require("../models/role.model");

const {
    generateAccessToken,
    generateRefreshToken,
} = require("../utils/token.util");

/**
 * Verify Google ID Token and extract authenticated payload
 */
async function verifyGoogleCredential(credential) {
    if (!credential) {
        throw { status: 400, message: "Google credential is required" };
    }

    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload.email || !payload.email_verified) {
            throw { status: 401, message: "Google email is not verified" };
        }

        return payload;
    } catch (error) {
        if (error.status) throw error;
        throw { status: 401, message: "Invalid or expired Google credential" };
    }
}

/**
 * Service for Google Sign Up (creates new account with chosen role)
 */
async function googleSignUpService({ credential, role = "user" }) {
    const payload = await verifyGoogleCredential(credential);
    const { sub, email } = payload;

    // 1. Check if user already exists
    const existingUser = await profileModel.findOne({
        $or: [{ googleId: sub }, { email: email.toLowerCase() }],
    });

    if (existingUser) {
        throw { status: 409, message: "User already exists. Please use /google/login instead" };
    }

    // 2. Resolve Role
    let roleDoc;
    if (mongoose.Types.ObjectId.isValid(role)) {
        roleDoc = await roleModel.findById(role);
    }
    if (!roleDoc && typeof role === "string") {
        roleDoc = await roleModel.findOne({ name: role });
    }
    if (!roleDoc) {
        roleDoc = await roleModel.create({
            name: typeof role === "string" ? role : "user",
            description: `Role for ${role}`,
        });
    }

    // 3. Create Profile
    const baseUsername = email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "");
    const username = `${baseUsername}_${crypto.randomBytes(3).toString("hex")}`;

    const user = await profileModel.create({
        googleId: sub,
        username,
        email: email.toLowerCase(),
        role: roleDoc._id,
    });

    // 4. Generate Tokens
    const accessToken = generateAccessToken({
        userId: user._id,
        role: roleDoc.name,
    });

    const refreshToken = generateRefreshToken({
        userId: user._id,
    });

    user.refreshTokens = [refreshToken];
    await user.save();

    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.refreshTokens;

    return { user: safeUser, accessToken, refreshToken };
}

/**
 * Service for Google Log In (authenticates existing user)
 */
async function googleLoginService({ credential }) {
    const payload = await verifyGoogleCredential(credential);
    const { sub, email } = payload;

    // 1. Find existing user
    const user = await profileModel.findOne({
        $or: [{ googleId: sub }, { email: email.toLowerCase() }],
    }).select("+refreshTokens").populate("role");

    if (!user) {
        throw { status: 404, message: "No account found with this Google email. Please sign up first" };
    }

    // 2. Google Account Mismatch Check
    if (user.googleId && user.googleId !== sub) {
        throw { status: 401, message: "Google account mismatch" };
    }

    // 3. Link googleId if user originally registered via email/password
    if (!user.googleId) {
        user.googleId = sub;
    }

    // 4. Issue Tokens
    const roleName = user.role?.name || "user";
    const accessToken = generateAccessToken({
        userId: user._id,
        role: roleName,
    });

    const refreshToken = generateRefreshToken({
        userId: user._id,
    });

    // Rotate / retain last 4 tokens + new token
    user.refreshTokens = [...(user.refreshTokens || []).slice(-4), refreshToken];
    await user.save();

    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.refreshTokens;

    return { user: safeUser, accessToken, refreshToken };
}

module.exports = {
    googleSignUpService,
    googleLoginService
};