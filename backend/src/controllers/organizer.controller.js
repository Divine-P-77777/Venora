const organizerService = require("../services/organizer.service");

async function registerOrganizer(req, res) {
    const user_id = req.user._id;
    const {
        organizationName, organizationType, registeredAddress,
        city, state, pincode, phone, website,
        gstin, pan, cin, udyamNumber, registrationCertificate
    } = req.body;

    if (!user_id || !organizationName || !organizationType || !registeredAddress || !city || !state || !pincode || !phone) {
        return res.status(400).json({ error: "Required core organization fields are missing." });
    }

    if (!pan) {
        return res.status(400).json({ error: "PAN is required for legal tax verification." });
    }

    try {
        const result = await organizerService.registerOrganizerService({
            ...req.body,
            user_id
        });
        return res.status(201).json({
            message: "Organizer registered successfully",
            organizer: result.organizer,
            legalDocs: result.legalDocs
        });
    } catch (error) {
        console.error("Organizer registration error:", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: "Organizer registration failed due to a server error." });
    }
}

async function onboardingOrganizer(req, res) {
    const org_id = req.organizer._id;
    const {
        representativeName,
        representativeDesignation,
        representativeEmail,
        representativePhone,
        representativePan,
        representativeKycDocument
    } = req.body;

    if (!org_id || !representativeName || !representativeDesignation || !representativeEmail || !representativePhone || !representativePan || !representativeKycDocument) {
        return res.status(400).json({ error: "All representative fields are required." });
    }

    try {
        const result = await organizerService.onboardingOrganizerService({
            ...req.body,
            org_id
        });
        return res.status(201).json({
            message: "Representative onboarded successfully",
            representative: result
        });
    } catch (error) {
        console.error("Organizer onboarding error:", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        if (error.code === 11000) {
            return res.status(409).json({ error: "Duplicate entry detected for representative." });
        }
        
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: "Organizer representative onboarding failed." });
    }
}

module.exports = {
    registerOrganizer,
    onboardingOrganizer
};
