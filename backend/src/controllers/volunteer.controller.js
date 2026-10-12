const volunteerService = require("../services/volunteer.service");
const organizerModel = require("../models/organizer.model");

async function registerVolunteer(req, res) {
    try {
        const {
            profile_id,
            org_id,
            name,
            email,
            phone,
            dob,
            profile_image,
            assigned_events,
            assigned_gate
        } = req.body;

        if (!org_id || !name || !email || !phone || !dob) {
            return res.status(400).json({ error: "Required fields (org_id, name, email, phone, dob) are missing." });
        }

        const createdBy = req.user._id;
        let account_status = "pending";
        let actual_profile_id = profile_id || null; // Allowed if organizer assigns an existing profile

        // Check if the person making the request is the organizer
        // Assuming org_id references the Organizer document, and the organizer document has org_id   the user's profile ID
        const isRequesterOrganizer = await organizerModel.findOne({ _id: org_id, org_id: createdBy });

        if (isRequesterOrganizer) {

            account_status = "active";
        } else {

            actual_profile_id = createdBy;
        }

        const volunteerData = {
            profile_id: actual_profile_id,
            org_id,
            name,
            email,
            phone,
            dob,
            profile_image,
            assigned_events,
            assigned_gate,
            account_status,
            createdBy
        };

        const result = await volunteerService.registerVolunteerService(volunteerData);
        return res.status(201).json({
            message: "Volunteer registered successfully",
            volunteer: result
        });

    } catch (error) {
        console.error("Volunteer registration error:", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: "Volunteer registration failed" });
    }
}

async function getVolunteer(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Volunteer ID is required." });
        }

        const volunteer = await volunteerService.getVolunteerService(id);
        return res.status(200).json(volunteer);

    } catch (error) {
        console.error("Get volunteer error:", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Failed to retrieve volunteer" });
    }
}

async function updateVolunteer(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Volunteer ID is required." });
        }

        // Prevent updating critical fields like org_id or email directly through this route
        // If they need to change email, that should go through an auth flow.
        const updateData = { ...req.body };
        delete updateData.email;
        delete updateData.org_id;

        const updatedVolunteer = await volunteerService.updateVolunteerService(id, updateData);
        return res.status(200).json({
            message: "Volunteer updated successfully",
            volunteer: updatedVolunteer
        });

    } catch (error) {
        console.error("Update volunteer error:", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: "Failed to update volunteer" });
    }
}

async function deleteVolunteer(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Volunteer ID is required." });
        }

        const deletedVolunteer = await volunteerService.deleteVolunteerService(id);
        return res.status(200).json({
            message: "Volunteer deleted successfully",
            volunteer: deletedVolunteer
        });

    } catch (error) {
        console.error("Delete volunteer error:", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Failed to delete volunteer" });
    }
}


async function scanTicketbyVolunteer(req, res) {
    try {
        const { id } = req.params;
        const { qrCodeToken } = req.body;

        if (!qrCodeToken) {
            return res.status(400).json({ error: "qrCodeToken is required" });
        }

        const result = await volunteerService.scanTicketVolunteerService(id, qrCodeToken, req.user._id);

        return res.status(200).json({
            message: "Ticket scanned successfully",
            ticket: result
        });

    } catch (error) {
        console.error("Ticket scan error:", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Failed to scan ticket." });
    }
}
module.exports = {
    registerVolunteer,
    getVolunteer,
    updateVolunteer,
    deleteVolunteer,
    scanTicketbyVolunteer

};