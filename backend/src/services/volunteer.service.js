const volunteerModel = require("../models/volunteer.model");
const bookTicketModel = require("../models/book-ticket.model");

async function registerVolunteerService(volunteerData) {
    const existingVolunteer = await volunteerModel.findOne({ email: volunteerData.email });
    if (existingVolunteer) {
        throw { status: 409, message: "A volunteer with this email already exists." };
    }

    const volunteer = new volunteerModel(volunteerData);
    const result = await volunteer.save();
    return result;
}

async function getVolunteerService(volunteerId) {
    const volunteer = await volunteerModel.findById(volunteerId)
        .populate('org_id', 'organizationName')
        .populate('assigned_events', 'eventName startDate endDate');

    if (!volunteer) {
        throw { status: 404, message: "Volunteer not found." };
    }

    return volunteer;
}

async function updateVolunteerService(volunteerId, updateData) {
    // We use runValidators: true to ensure enums and required fields are respected during update
    const volunteer = await volunteerModel.findByIdAndUpdate(
        volunteerId,
        updateData,
        { new: true, runValidators: true }
    );

    if (!volunteer) {
        throw { status: 404, message: "Volunteer not found." };
    }

    return volunteer;
}

async function deleteVolunteerService(volunteerId) {
    const volunteer = await volunteerModel.findByIdAndDelete(volunteerId);

    if (!volunteer) {
        throw { status: 404, message: "Volunteer not found." };
    }

    return volunteer;
}

async function scanTicketVolunteerService(volunteerId, qrCodeToken, loggedInUserId) {
    const volunteer = await volunteerModel.findById(volunteerId);

    if (!volunteer) {
        throw { status: 404, message: "Volunteer profile not found." };
    }

    if (volunteer.account_status !== "active") {
        throw { status: 403, message: "Volunteer account is not active. Cannot scan tickets." };
    }

    // Ensure the person logged in actually owns this volunteer profile
    if (!volunteer.profile_id || volunteer.profile_id.toString() !== loggedInUserId.toString()) {
        throw { status: 403, message: "You are not authorized to scan tickets for this volunteer profile." };
    }

    const ticket = await bookTicketModel.findOne({ qrCodeToken });

    if (!ticket) {
        throw { status: 404, message: "Invalid QR Code: Ticket not found." };
    }

    if (ticket.paymentStatus !== "successful") {
        throw { status: 400, message: "Cannot check in: Ticket payment was not successful." };
    }

    if (ticket.checkInStatus) {
        throw { status: 409, message: "Ticket has already been used." };
    }

    // Mark the ticket as checked in
    ticket.checkInStatus = true;
    ticket.checkInTime = new Date();
    ticket.checkedInBy = volunteerId;

    await ticket.save();
    return ticket;
}

module.exports = {
    registerVolunteerService,
    getVolunteerService,
    updateVolunteerService,
    deleteVolunteerService,
    scanTicketVolunteerService
};
