const eventModel = require("../models/event.model");

async function getAllEventsService(skipIndex, limit) {
    const events = await eventModel.find().populate("org_id", "organizationName city website").sort({ createdAt: -1 }).skip(skipIndex).limit(limit);
    return events;
}

async function getEventService(eventId) {
    const event = await eventModel.findById(eventId).populate("org_id", "organizationName city website");
    return event;
}

async function createEventService(eventData) {
    const event = new eventModel(eventData);
    const result = await event.save();
    return result;
}

async function updateEventService(eventId, orgId, updateData) {
    const event = await eventModel.findOneAndUpdate(
        { _id: eventId, org_id: orgId },
        updateData,
        { new: true, runValidators: true }
    );
    return event;
}

async function deleteEventService(eventId, orgId) {
    const event = await eventModel.findOneAndDelete({ _id: eventId, org_id: orgId });
    return event;
}

module.exports = {
    getAllEventsService,
    getEventService,
    createEventService,
    updateEventService,
    deleteEventService
};
