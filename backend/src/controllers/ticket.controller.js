const ticketService = require("../services/ticket.service");

async function bookTicket(req, res) {
    try {
        const {
            event_id,
            tickets,
            totalAmount
        } = req.body;
        const bookedBy = req.user._id;

        if (!event_id || !tickets || !totalAmount) {
            return res.status(400).json({ error: "Required fields (event_id, tickets, totalAmount) are missing for ticket booking." });
        }

        const bookingData = {
            event_id,
            bookedBy,
            tickets,
            totalAmount,
            paymentStatus: 'pending'
        };

        const result = await ticketService.bookTicketService(bookingData);

        return res.status(201).json({
            message: "Ticket order created successfully. Proceed to payment.",
            orderId: result.orderId,
            ticket: result
        });

    } catch (error) {
        console.error("Ticket booking error:", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: "Ticket booking failed due to an internal server error." });
    }
}

async function verifyPayment(req, res) {
    try {
        const { orderId, paymentId, paymentStatus } = req.body;

        if (!orderId || !paymentStatus) {
            return res.status(400).json({ error: "orderId and paymentStatus are required." });
        }

        const result = await ticketService.updatePaymentStatusService(orderId, { paymentId, paymentStatus });

        return res.status(200).json({
            message: "Payment status updated successfully",
            ticket: result
        });

    } catch (error) {
        console.error("Payment verification error:", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Failed to update payment status." });
    }
}

async function getTicket(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Ticket ID is required." });
        }

        const result = await ticketService.getTicketService(id);

        return res.status(200).json({
            message: "Ticket Details",
            ticket: result
        });

    } catch (error) {
        console.error("Get ticket error:", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Failed to fetch ticket details." });
    }
}

async function getUserTickets(req, res) {
    try {

        const userId = req.user ? req.user._id : req.params.userId;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required to fetch tickets." });
        }

        const tickets = await ticketService.getUserTicketsService(userId);

        return res.status(200).json({
            message: "User tickets retrieved",
            tickets
        });

    } catch (error) {
        console.error("Get user tickets error:", error);
        return res.status(500).json({ error: "Failed to fetch user tickets." });
    }
}

module.exports = {
    bookTicket,
    verifyPayment,
    getTicket,
    getUserTickets
};