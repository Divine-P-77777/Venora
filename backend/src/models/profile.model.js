const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
        select: false, // Security: Never return hashed password in queries by default
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles",
        required: true
    },
    refreshTokens: {
        type: [String],
        default: [],
        select: false,
    }
}, { timestamps: true });

const profileModel = mongoose.model("profiles", ProfileSchema);

module.exports = profileModel;