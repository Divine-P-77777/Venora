const eventService = require("../services/event.service");

async function registerEvent(req, res) {
    try {
        const org_id = req.organizer._id;
        const createdBy = req.user._id;

        const {
            eventName,
            purpose,
            category,
            capacity,
            startDate,
            endDate,
            startTime,
            endTime,
            isOnline,
            venue,
            description,
            bannerImage,
            price,
            ticketType,
            status,
        } = req.body;

        if (!eventName || !purpose || !category || !capacity || !startDate || !endDate || !startTime || !endTime || isOnline === undefined || (!isOnline && !venue) || !description || !price || !ticketType || !status) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        const eventData = {
            org_id,
            eventName,
            purpose,
            category,
            capacity,
            startDate,
            endDate,
            startTime,
            endTime,
            isOnline,
            venue,
            description,
            bannerImage,
            price,
            ticketType,
            status,
            createdBy
        };

        const result = await eventService.createEventService(eventData);
        res.status(201).json({
            message: "Event registered successfully",
            event: result
        });

    } catch (error) {
        console.error("Event registration error:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Event registration failed." });
    }
}

async function updateEvent(req, res) {
    try {
        const { id } = req.params;
        const org_id = req.organizer._id;

        if (!id) {
            return res.status(400).json({ error: "Event ID is required." });
        }

        const updatedEvent = await eventService.updateEventService(id, org_id, req.body);

        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found or not authorized to update." });
        }

        res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent
        });
    } catch (error) {
        console.error("Event update error:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Event update failed." });
    }
}

async function deleteEvent(req, res) {
    try {
        const { id } = req.params;
        const org_id = req.organizer._id;

        if (!id) {
            return res.status(400).json({ error: "Event ID is required." });
        }

        const deletedEvent = await eventService.deleteEventService(id, org_id);

        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found or not authorized to delete." });
        }

        res.status(200).json({
            message: "Event deleted successfully",
            event: deletedEvent
        });
    } catch (error) {
        console.error("Event deletion error:", error);
        return res.status(500).json({ error: "Event deletion failed." });
    }
}

async function uploadMedia(req, res) {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }

        if (req.files.length === 1) {
            return res.status(200).json({
                message: "Banner image streamed to Cloudinary successfully",
                url: req.file.secure_url,
                public_id: req.file.public_id,
                file: req.file,
                fields: req.body
            });
        }

        return res.status(200).json({
            message: `${req.files.length} images streamed to Cloudinary successfully`,
            files: req.files,
            count: req.files.length,
            fields: req.body
        });
    } catch (error) {
        console.error("Error in uploadMedia controller:", error);
        return res.status(500).json({ error: "Media upload failed." });
    }
}

module.exports = {
    registerEvent,
    updateEvent,
    deleteEvent,
    uploadMedia
};