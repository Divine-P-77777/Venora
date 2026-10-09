const organizerModel = require("../models/organizer.model");

async function approvedOrganizer(req, res) {
    try {
        const { id } = req.params;
        const adminId = req.user._id;

        const organizer = await organizerModel.findByIdAndUpdate(
            id,
            { verificationStatus: "approved", verifiedBy: adminId },
            { new: true }
        );

        if (!organizer) {
            return res.status(404).json({ error: "Organizer not found." });
        }

        return res.status(200).json({
            message: "Organizer approved successfully",
            organizer
        });
    } catch (error) {
        console.error("Organizer approval error:", error);
        return res.status(500).json({ error: "Organizer approval failed." });
    }
}

async function rejectedOrganizer(req, res) {
    try {
        const { id } = req.params;
        const adminId = req.user._id;

        const organizer = await organizerModel.findByIdAndUpdate(
            id,
            { verificationStatus: "rejected", verifiedBy: adminId },
            { new: true }
        );

        if (!organizer) {
            return res.status(404).json({ error: "Organizer not found." });
        }

        return res.status(200).json({
            message: "Organizer rejected successfully",
            organizer
        });
    } catch (error) {
        console.error("Organizer rejection error:", error);
        return res.status(500).json({ error: "Organizer rejection failed." });
    }
}

module.exports = {
    approvedOrganizer,
    rejectedOrganizer
};