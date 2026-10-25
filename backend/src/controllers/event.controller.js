const eventService = require("../services/event.service");
const {
    getCache,
    setCache,
    deleteCache,
    deleteCachePattern
} = require("../services/cache.service");

/**
 * Fetch paginated list of events with Redis Cache-Aside
 */
async function getAllEvents(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const cacheKey = `events:list:page=${page}:limit=${limit}`;

        // Try reading from Redis Cache
        const cachedEvents = await getCache(cacheKey);
        if (cachedEvents) {
            res.setHeader("X-Cache", "HIT");
            return res.status(200).json({
                message: "Events fetched successfully",
                events: cachedEvents,
                source: "cache"
            });
        }

        // Cache Miss: Query MongoDB
        const skipIndex = (page - 1) * limit;
        const events = await eventService.getAllEventsService(skipIndex, limit);

        // Populate Redis Cache (10 min)
        await setCache(cacheKey, events, 600);

        res.setHeader("X-Cache", "MISS");
        return res.status(200).json({
            message: "Events fetched successfully",
            events,
            source: "database"
        });
    } catch (error) {
        console.error("Event fetching error:", error);
        return res.status(500).json({ error: "Event fetching failed." });
    }
}

/**
 * Fetch a single event by ID with Redis Cache-Aside
 */
async function getEvent(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Event ID is required." });
        }

        const cacheKey = `event:${id}`;

        // Try reading from Redis Cache
        const cachedEvent = await getCache(cacheKey);
        if (cachedEvent) {
            res.setHeader("X-Cache", "HIT");
            return res.status(200).json({
                message: "Event fetched successfully",
                event: cachedEvent,
                source: "cache"
            });
        }

        // Cache Miss: Query MongoDB
        const event = await eventService.getEventService(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found." });
        }

        // Populate Redis Cache (1 hour)
        await setCache(cacheKey, event, 3600);

        res.setHeader("X-Cache", "MISS");
        return res.status(200).json({
            message: "Event fetched successfully",
            event,
            source: "database"
        });
    } catch (error) {
        console.error("Event fetching error:", error);
        return res.status(500).json({ error: "Event fetching failed." });
    }
}

/**
 * Register a new event and invalidate list caches
 */
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

        if (!eventName || !purpose || !category || !capacity || !startDate || !startTime || !endTime || isOnline === undefined || (!isOnline && !venue) || !description || price === undefined || !ticketType || !status) {
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

        // Invalidate all event listing caches
        await deleteCachePattern("events:list:*");

        return res.status(201).json({
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

/**
 * Update an event and invalidate its cache and listing caches
 */
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

        // Cache-Aside Invalidation: Purge both the event detail cache and listing caches
        await deleteCache(`event:${id}`);
        await deleteCachePattern("events:list:*");

        return res.status(200).json({
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

/**
 * Delete an event and invalidate its cache and listing caches
 */
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

        // Cache-Aside Invalidation: Purge both the event detail cache and listing caches
        await deleteCache(`event:${id}`);
        await deleteCachePattern("events:list:*");

        return res.status(200).json({
            message: "Event deleted successfully",
            event: deletedEvent
        });
    } catch (error) {
        console.error("Event deletion error:", error);
        return res.status(500).json({ error: "Event deletion failed." });
    }
}

/**
 * Upload event banner images or media
 */
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
    getAllEvents,
    getEvent,
    registerEvent,
    updateEvent,
    deleteEvent,
    uploadMedia
};