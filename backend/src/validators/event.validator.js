const { body, param } = require("express-validator");
const { validate } = require("../middlewares/validate.middleware");

const eventRegisterValidation = [
    body("eventName")
        .trim()
        .notEmpty()
        .withMessage("Event name is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Event name must be between 3 and 100 characters"),
    body("purpose")
        .trim()
        .notEmpty()
        .withMessage("Purpose is required"),
    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),
    body("capacity")
        .isInt({ min: 1 })
        .withMessage("Capacity must be at least 1"),
    body("startDate")
        .isISO8601()
        .withMessage("Valid ISO8601 start date is required"),
    body("endDate")
        .optional({ checkFalsy: true })
        .isISO8601()
        .withMessage("Valid ISO8601 end date is required"),
    body("startTime")
        .trim()
        .notEmpty()
        .withMessage("Start time is required"),
    body("endTime")
        .trim()
        .notEmpty()
        .withMessage("End time is required"),
    body("isOnline")
        .isBoolean()
        .withMessage("isOnline must be a boolean (true or false)"),
    body("venue")
        .if(body("isOnline").isIn([false, "false"]))
        .trim()
        .notEmpty()
        .withMessage("Venue is required for offline events"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),
    body("price")
        .isFloat({ min: 0 })
        .withMessage("Price must be a valid non-negative number"),
    body("ticketType")
        .isArray({ min: 1 })
        .withMessage("ticketType must be an array with at least one ticket type"),
    body("bannerImage")
        .optional({ checkFalsy: true })
        .isURL()
        .withMessage("bannerImage must be a valid URL"),
    body("status")
        .optional()
        .isIn(["Active", "Draft", "inActive"])
        .withMessage("Status must be Active, Draft, or inActive"),
    validate
];

const eventUpdateValidation = [
    param("id")
        .isMongoId()
        .withMessage("Valid Event ID parameter is required"),
    body("eventName")
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage("Event name must be between 3 and 100 characters"),
    body("capacity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Capacity must be at least 1"),
    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be a valid non-negative number"),
    body("bannerImage")
        .optional({ checkFalsy: true })
        .isURL()
        .withMessage("bannerImage must be a valid URL"),
    body("status")
        .optional()
        .isIn(["Active", "Draft", "inActive"])
        .withMessage("Status must be Active, Draft, or inActive"),
    validate
];

module.exports = {
    eventRegisterValidation,
    eventUpdateValidation
};