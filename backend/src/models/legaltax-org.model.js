const mongoose = require("mongoose");

const LegalTaxOrgSchema = new mongoose.Schema({
    org_id: {
        ref: "organizers",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    pan: {
        type: String,
        required: true
    },
    gstin: {
        type: String,
    },
    cin: {
        type: String,
    },
    udyamNumber: {
        type: String,
    },
    registrationCertificate: {
        type: String,

    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const legalTaxOrganizerModel = mongoose.model("legaltaxorg", LegalTaxOrgSchema)

module.exports = legalTaxOrganizerModel;
