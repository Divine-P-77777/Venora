const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    org_id: {
        ref: "organizers",
        type: mongoose.Schema.Types.ObjectId,
        required: true,

    },
    eventName: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,

    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    isOnline: {
        type: Boolean,
        required: true
    },
    venue: {
        type: String,
        required: function () {
            return this.isOnline === false;
        }
    },
    description: {
        type: String,
        required: true
    },
    bannerImage: {
        type: String,

    },
    price: {
        type: Number,
        required: true
    },
    ticketType: {
        type: [String],
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


const eventModel = mongoose.model("events", eventSchema)
module.exports = eventModel;

