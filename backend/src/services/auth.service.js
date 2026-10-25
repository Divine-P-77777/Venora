const bcrypt = require("bcryptjs");
const profileModel = require("../models/profile.model");
const roleModel = require("../models/role.model");
const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} = require("../utils/token.util");

async function profileRegisterService({ username, email, password, role }) {

    const existingUser = await profileModel.findOne({
        $or: [{ email: email.toLowerCase() }, { username }]
    });

    if (existingUser) {
        throw { status: 409, message: "User with this email or username already exists" };
    }


    const roleDoc = await roleModel.findById(role);
    if (!roleDoc) {
        throw { status: 400, message: "Invalid role specified" };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const userProfile = new profileModel({
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: roleDoc._id
    });

    // Generate Access & Refresh tokens
    const accessToken = generateAccessToken({
        userId: userProfile._id,
        role: roleDoc.name
    });

    const refreshToken = generateRefreshToken({
        userId: userProfile._id
    });

    // Store refresh token in profile for rotation / revocation
    userProfile.refreshTokens = [refreshToken];
    await userProfile.save();

    // Return safe profile representation (excluding password)
    const userResponse = userProfile.toObject();
    delete userResponse.password;
    delete userResponse.refreshTokens;

    return {
        user: userResponse,
        accessToken,
        refreshToken
    };
}


async function profileLoginService({ email, password }) {

    const user = await profileModel.findOne({
        $or: [{ email: email.toLowerCase() }, { username: email }]
    }).select("+password +refreshTokens").populate("role");
    // explicitly selecting password and refreshTokens

    if (!user || !user.password) {
        throw { status: 401, message: "Invalid email/username or password" };
    }

    // Compare password with bcrypt
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw { status: 401, message: "Invalid Password , change password if you forgot it" };
    }

    // Issue fresh tokens
    const roleName = user.role?.name || "user";
    const accessToken = generateAccessToken({
        userId: user._id,
        role: roleName
    });

    const refreshToken = generateRefreshToken({
        userId: user._id
    });

    // 4. Limit active refresh tokens to prevent unbounded array growth (e.g., max 5 sessions)
    const activeTokens = user.refreshTokens || [];
    const updatedTokens = [...activeTokens.slice(-4), refreshToken];

    user.refreshTokens = updatedTokens;
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshTokens;

    return {
        user: userResponse,
        accessToken,
        refreshToken
    };
}

/**
 * Refresh access token using a valid, unrevoked refresh token.
 */
async function refreshTokenService(incomingRefreshToken) {
    if (!incomingRefreshToken) {
        throw { status: 401, message: "Refresh token is missing" };
    }

    // Verify cryptographic signature & expiry
    let decoded;
    try {
        decoded = verifyRefreshToken(incomingRefreshToken);
    } catch (err) {
        throw { status: 403, message: "Invalid or expired refresh token" };
    }

    // Find user in database and verify token hasn't been revoked
    const user = await profileModel.findById(decoded.userId)
        .select("+refreshTokens")
        .populate("role");

    if (!user) {
        throw { status: 404, message: "User profile no longer exists" };
    }

    // Token Reuse / Revocation Check:
    // If the token is not in the user's active list, it was already used or revoked!
    const tokenIndex = user.refreshTokens.indexOf(incomingRefreshToken);
    if (tokenIndex === -1) {
        // Potential Token Reuse Attack: Invalidate all active tokens for security
        user.refreshTokens = [];
        await user.save();
        throw { status: 403, message: "Refresh token has been revoked or reused. Please login again." };
    }

    // Issue new access token and rotate refresh token
    const roleName = user.role?.name || "user";
    const newAccessToken = generateAccessToken({
        userId: user._id,
        role: roleName
    });

    const newRefreshToken = generateRefreshToken({
        userId: user._id
    });

    // Replace used refresh token with the new one (Token Rotation)
    user.refreshTokens[tokenIndex] = newRefreshToken;
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshTokens;

    return {
        user: userResponse,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };
}

/**
 * Logout user by revoking the refresh token and invalidating the session.
 */
async function profileLogoutService(userId, incomingRefreshToken) {
    if (!userId && !incomingRefreshToken) {
        return true;
    }

    if (incomingRefreshToken) {
        await profileModel.updateOne(
            { refreshTokens: incomingRefreshToken },
            { $pull: { refreshTokens: incomingRefreshToken } }
        );
    } else if (userId) {
        await profileModel.findByIdAndUpdate(userId, {
            $set: { refreshTokens: [] }
        });
    }

    return true;
}

module.exports = {
    profileRegisterService,
    profileLoginService,
    refreshTokenService,
    profileLogoutService
};