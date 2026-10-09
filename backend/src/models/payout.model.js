const mongoose = require("mongoose");

const PayoutSchema = new mongoose.Schema({
    org_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organizers",
        required: true
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    platformFee: {
        type: Number,
        required: true
    },
    payoutAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "processing", "completed", "failed"],
        default: "pending"
    },
    payoutDate: {
        type: Date
    },
    transactionId: {
        type: String
    },
    processedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profiles" // Admin who processed it
    },
    remarks: {
        type: String
    }
}, {
    timestamps: true
});

const PayoutModel = mongoose.model("payout", PayoutSchema);
module.exports = PayoutModel;
