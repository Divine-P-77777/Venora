const bookTicketModel = require("../models/book-ticket.model");
const eventModel = require("../models/event.model");
const crypto = require("crypto");

const bookTicketService = async (bookingData) => {
    const event = await eventModel.findById(bookingData.event_id);
    if (!event) {
        throw { status: 404, message: "Event not found." };
    }

    // Generate a unique order ID for Cashfree if not provided
    const orderId = bookingData.orderId || `ORDER_${crypto.randomUUID()}`;

    const ticket = new bookTicketModel({
        event_id: bookingData.event_id,
        bookedBy: bookingData.bookedBy,
        org_id: event.org_id,
        tickets: bookingData.tickets,
        totalAmount: bookingData.totalAmount,
        paymentStatus: bookingData.paymentStatus || 'pending',
        orderId: orderId
    });

    const result = await ticket.save();
    return result;
}

const updatePaymentStatusService = async (orderId, paymentData) => {
    const updatePayload = {
        paymentStatus: paymentData.paymentStatus,
        paymentId: paymentData.paymentId
    };

    // If payment is successful, generate the QR code token for the ticket
    if (paymentData.paymentStatus === 'successful') {
        updatePayload.qrCodeToken = `QR_${crypto.randomUUID()}`;
    }

    const ticket = await bookTicketModel.findOneAndUpdate(
        { orderId },
        updatePayload,
        { new: true }
    );

    if (!ticket) {
        throw { status: 404, message: "Ticket order not found." };
    }

    return ticket;
}

const getTicketService = async (ticketId) => {
    const ticket = await bookTicketModel.findById(ticketId)
        .populate('event_id', 'eventName startDate endDate venue')
        .populate('org_id', 'organizationName')
        .populate('bookedBy', 'username email');

    if (!ticket) {
        throw { status: 404, message: "Ticket not found." };
    }

    return ticket;
}

const getUserTicketsService = async (userId) => {
    const tickets = await bookTicketModel.find({ bookedBy: userId })
        .populate('event_id', 'eventName startDate endDate venue bannerImage')
        .sort({ created_at: -1 });

    return tickets;
}

module.exports = {
    bookTicketService,
    updatePaymentStatusService,
    getTicketService,
    getUserTicketsService
};