const organizerModel = require("../models/organizer.model")

async function registerOrganizer(req, res) {
    try {
        const { user_id, organizerName, phone, address, gstPan } = req.body;


        if (!user_id || !organizerName || !phone || !address || !gstPan) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const organizer = new organizerModel({
            organizerName,
            phone,
            address,
            gstPan,
            isActive,
            createdBy: user_id
        });
        const result = await organizer.save();
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Organizer registration failed" });
    }
}