const mongoose = require("mongoose");
const { eventNames } = require("../app");

const EventSchema = new mongoose.Schema({


    eventName: {
        type: String,
        required: true,
        unique: true,
    },
    catagory: {
        type: String,
        enum: ["Music", "Sport", "Food", "Tech", "Other"],
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isActive: {
        type: String,
        default: false




    },

})

const eventModel = mongoose.model("events", EventSchema)

module.exports = eventModel;