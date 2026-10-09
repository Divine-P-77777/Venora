const mongoose = require("mongoose");


const TicketSchema = new mongoose.Schema({
    ticketType: {
        type: String,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    ticketQuantity: {
        type: Number,
        required: true,
        default: 1
    }
}, { _id: true })

const BookTicketSchema = new mongoose.Schema({
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
        required: true
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profiles",
        required: true
    },
    org_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organizers",
        required: true
    },
    tickets: [TicketSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "successful", "failed", "refunded"],
        default: "pending"
    },
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    qrCodeToken: {
        type: String,
        unique: true,
        sparse: true
    },
    checkInStatus: {
        type: Boolean,
        default: false
    },
    checkInTime: {
        type: Date
    },
    checkedInBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "volunteer"
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const bookTicketModel = mongoose.model("bookedticket", BookTicketSchema)

module.exports = bookTicketModel;