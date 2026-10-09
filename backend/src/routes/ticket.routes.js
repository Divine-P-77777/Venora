const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");
const { AuthenticateUser } = require("../middlewares/auth.middlewares");
const {
    bookTicketValidation,
    verifyPaymentValidation,
    ticketIdParamValidation
} = require("../validators/ticket.validator");

router.post("/book", AuthenticateUser, bookTicketValidation, ticketController.bookTicket);
router.post("/verify-payment", AuthenticateUser, verifyPaymentValidation, ticketController.verifyPayment);
router.get("/my-tickets", AuthenticateUser, ticketController.getUserTickets);
router.get("/:id", AuthenticateUser, ticketIdParamValidation, ticketController.getTicket);

module.exports = router;