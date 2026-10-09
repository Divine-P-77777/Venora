const mongoose = require("mongoose");

const representativeOrgSchema = new mongoose.Schema({
    org_id: {
        ref: "organizers",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true

    },
    representativeName: {
        type: String,
        required: true
    },
    representativeDesignation: {
        type: String,
        required: true
    },
    representativeEmail: {
        type: String,
    },
    representativePhone: {
        type: String,
    },
    representativePan: {
        type: String,

    },
    representativeKycDocument: {
        type: String,

    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const representativeOrgModel = mongoose.model("representative-org", representativeOrgSchema)

module.exports = representativeOrgModel;
