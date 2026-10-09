const eventModel = require("../models/event.model");

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
    createEventService,
    updateEventService,
    deleteEventService
};
