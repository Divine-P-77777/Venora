const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({

    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,

    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles",
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }

})

const profileModel = mongoose.model("profiles", ProfileSchema)

module.exports = profileModel;