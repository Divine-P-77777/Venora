const { body, param } = require("express-validator");
const { validate } = require("../middlewares/validate.middleware");

const bookTicketValidation = [
    body("event_id")
        .notEmpty()
        .withMessage("Event ID is required")
        .isMongoId()
        .withMessage("Invalid Event ID format"),
    body("tickets")
        .isArray({ min: 1 })
        .withMessage("Tickets array must contain at least one ticket"),
    body("tickets.*.ticketType")
        .trim()
        .notEmpty()
        .withMessage("Each ticket must specify a ticketType"),
    body("tickets.*.ticketPrice")
        .isFloat({ min: 0 })
        .withMessage("Each ticket price must be a non-negative number"),
    body("tickets.*.ticketQuantity")
        .isInt({ min: 1 })
        .withMessage("Ticket quantity must be at least 1"),
    body("totalAmount")
        .isFloat({ min: 0 })
        .withMessage("Total amount must be a valid non-negative number"),
    validate
];

const verifyPaymentValidation = [
    body("orderId")
        .trim()
        .notEmpty()
        .withMessage("orderId is required"),
    body("paymentStatus")
        .trim()
        .notEmpty()
        .withMessage("paymentStatus is required")
        .isIn(["pending", "successful", "failed", "refunded"])
        .withMessage("Invalid payment status value"),
    body("paymentId")
        .optional({ checkFalsy: true })
        .trim(),
    validate
];

const ticketIdParamValidation = [
    param("id")
        .isMongoId()
        .withMessage("Valid Ticket ID parameter is required"),
    validate
];

module.exports = {
    bookTicketValidation,
    verifyPaymentValidation,
    ticketIdParamValidation
};
