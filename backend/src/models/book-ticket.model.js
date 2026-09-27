const mongoose = require("mongoose");


const EventSchema = new mongoose.Schema({

    ticketId: {
        type: String,
        required: true,
    }
    ,

    myself: {
        type: Boolean,
        required: true,

    },
    memberName: {
        type: String,
        required: true
    },
    memberAge: {
        type: Number,
        required: true
    },
    totalMembers: {
        type: Number,
        required: true
    },
    memberInfo: {
        type: Array,
        required: true
    },



})

const eventModel = mongoose.model("events", EventSchema)

module.exports = eventModel;