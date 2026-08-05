const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({


    username :{
        type: String,
        required: true,
        unique : true,

    },
    role:{
        type : String,
        enums:["user","event-manager","admin","volunteer"],
        default :"user"
    },
    email :{
        type: String,
        required: true,
        unique : true,

    },
    password :{
        type: String

    }
})

const profileModel = mongoose.model("profile", ProfileSchema)

module.exports = profileModel;