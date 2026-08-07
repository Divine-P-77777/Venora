const eventModel = require("../models/event.model")


async function registerEvent(req, res) {
    try {
        const {
            eventName,
            catagory,
            organizer,
            time,
            phone,
            email,
            date,
            isActive,


        } = req.body;

        if (!eventName || !catagory || !organizer || !time || !phone || !email || !date || !isActive) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const event = new eventModel({
            eventName,
            catagory,
            organizer,
            time,
            phone,
            email,
            date,
            isActive,


        });

        const result = await event.save();
        res.status(201).json(result);

    } catch (error) {

    }




}


async function updateEvent(req, res) {

    const { id } = req.params;
    const { eventName, catagory, organizer, time, phone, email, date, isActive } = req.body;

    const event = await eventModel.findByIdAndUpdate(id, { eventName, catagory, organizer, time, phone, email, date, isActive }, { new: true });
    res.status(200).json(event);
}


async function deleteEvent(req, res) {

    const { id } = req.params;
    const event = await eventModel.findByIdAndDelete(id);
    res.status(200).json(event);
}

module.exports = { registerEvent, updateEvent, deleteEvent }