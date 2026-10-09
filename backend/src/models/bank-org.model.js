const mongoose = require("mongoose");

const BankOrgSchema = new mongoose.Schema({

    org_id: {
        ref: "organizers",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    accountHolderName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    bankProof: {
        type: String,
        required: true
    },
    verificationStatus: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending"
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const BankOrgModel = mongoose.model("bankorg", BankOrgSchema)

module.exports = BankOrgModel;
