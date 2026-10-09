const mongoose = require("mongoose");
const organizerModel = require("../models/organizer.model");
const legalTaxOrganizerModel = require("../models/legaltax-org.model");
const representativeOrgModel = require("../models/representative-org.model");

async function registerOrganizerService(organizerData) {
    const {
        user_id,
        organizationName, organizationType, registeredAddress,
        city, state, pincode, phone, website,
        gstin, pan, cin, udyamNumber, registrationCertificate
    } = organizerData;

    const session = await mongoose.startSession();
    
    try {
        let result;
        let result1;

        await session.withTransaction(async () => {
            const existingOrg = await organizerModel.findOne({ org_id: user_id }).session(session);
            if (existingOrg) {
                throw { status: 409, message: "Organizer profile already exists for this user." };
            }

            const organizer = new organizerModel({
                org_id: user_id,
                organizationName,
                organizationType,
                registeredAddress,
                city,
                state,
                pincode,
                phone,
                website,
            });

            const organizer_legalDoc = new legalTaxOrganizerModel({
                org_id: organizer._id,
                pan,
                gstin,
                cin,
                udyamNumber,
                registrationCertificate,
            });
            
            result = await organizer.save({ session });
            result1 = await organizer_legalDoc.save({ session });
        });
        
        return { organizer: result, legalDocs: result1 };

    } catch (error) {
        throw error;
    } finally {
        await session.endSession();
    }
}

async function onboardingOrganizerService(representativeData) {
    const {
        org_id,
        representativeName,
        representativeDesignation,
        representativeEmail,
        representativePhone,
        representativePan,
        representativeKycDocument
    } = representativeData;

    const [organizerExists, existingRep] = await Promise.all([
        organizerModel.findById(org_id).lean(),
        representativeOrgModel.findOne({ org_id }).lean()
    ]);

    if (!organizerExists) {
        throw { status: 404, message: "Organizer not found. Cannot add representative." };
    }

    if (existingRep) {
        throw { status: 409, message: "A representative is already registered for this organizer." };
    }

    const organizer_representative = new representativeOrgModel({
        org_id,
        representativeName,
        representativeDesignation,
        representativeEmail,
        representativePhone,
        representativePan,
        representativeKycDocument,
    });

    const result = await organizer_representative.save();
    return result;
}

module.exports = {
    registerOrganizerService,
    onboardingOrganizerService
};
