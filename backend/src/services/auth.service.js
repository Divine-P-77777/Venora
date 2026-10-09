const profileModel = require("../models/profile.model");
const { clerkClient } = require("@clerk/backend");

async function profileRegisterService(profileData) {
    const { username, email, password, role } = profileData;


    const isUser = await profileModel.findOne({ $or: [{ email }, { username }] });
    if (isUser) {
        throw { status: 409, message: "User with this email or username already exists" };
    }


    const user = await clerkClient.users.createUser({
        emailAddress: [email],
        password: password,
        username: username
    });

    try {

        const userProfile = await profileModel.create({
            clerkId: user.id,
            username,
            email,
            role
        });

        return { user, userProfile };
    } catch (dbError) {
        // Transaction Rollback (if local DB fails, delete from Clerk to prevent orphaned accounts)
        console.error("Local DB Profile creation failed. Rolling back Clerk user...", dbError);
        await clerkClient.users.deleteUser(user.id);

        throw { status: 500, message: "Failed to save profile to database. User creation rolled back." };
    }
}

async function profileLoginService(loginData) {
    throw { status: 501, message: "Use Clerk Frontend SDK for login." };
}

async function profileLogoutService(userId) {
    throw { status: 501, message: "Use Clerk Frontend SDK for logout." };
}

module.exports = {
    profileRegisterService,
    profileLoginService,
    profileLogoutService
};