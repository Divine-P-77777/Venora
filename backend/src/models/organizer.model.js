const mongoose = require("mongoose");

const OrganizerSchema = new mongoose.Schema({
    org_id: {
        ref: "profiles",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    organizationName: {
        type: String,
        required: true
    },
    organizationType: {
        type: String,
        required: true
    },
    registeredAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true

    },
    pincode: {
        type: String,
        required: true

    },
    phone: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    verificationStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    verificationRemarks: {
        type: String,

    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profiles"

    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const organizerModel = mongoose.model("organizers", OrganizerSchema)

module.exports = organizerModel;