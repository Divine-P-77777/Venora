const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    organizerName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gstPan: {
        type: String,
        required: true
    },
    isActive: {
        type: String,
        default: false
    },
    createdBy: {
        ref: "profiles",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

}, { timestamps: true })

const eventModel = mongoose.model("organizers", EventSchema)

module.exports = eventModel;