const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    organizer: {
        ref: "organizers",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Draft", "inActive"],
        default: "Draft"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profiles",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("events", eventSchema);