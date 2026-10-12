const { body, param } = require("express-validator");
const { validate } = require("../middlewares/validate.middleware");

const registerVolunteerValidation = [
    body("org_id")
        .notEmpty()
        .withMessage("Organizer ID is required")
        .isMongoId()
        .withMessage("Invalid Organizer ID format"),
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Volunteer name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Name must be between 2 and 100 characters"),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Valid email address is required"),
    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .isMobilePhone("any")
        .withMessage("Valid phone number is required"),
    body("dob")
        .isISO8601()
        .withMessage("Valid Date of Birth (ISO8601) is required"),
    body("profile_image")
        .optional({ checkFalsy: true })
        .isURL()
        .withMessage("profile_image must be a valid URL"),
    body("assigned_events")
        .optional()
        .isArray()
        .withMessage("assigned_events must be an array of event IDs"),
    body("assigned_events.*")
        .optional()
        .isMongoId()
        .withMessage("Each assigned event must be a valid Mongo ID"),
    body("assigned_gate")
        .optional()
        .trim()
        .isString(),
    validate
];

const updateVolunteerValidation = [
    param("id")
        .isMongoId()
        .withMessage("Valid Volunteer ID parameter is required"),
    body("account_status")
        .optional()
        .isIn(["pending", "rejected", "active", "suspended"])
        .withMessage("account_status must be pending, rejected, active, or suspended"),
    body("online_status")
        .optional()
        .isBoolean()
        .withMessage("online_status must be a boolean"),
    validate
];

const scanTicketValidation = [
    param("id")
        .isMongoId()
        .withMessage("Valid Volunteer ID parameter is required"),
    body("qrCodeToken")
        .trim()
        .notEmpty()
        .withMessage("qrCodeToken is required to scan ticket"),
    validate
];

const volunteerIdParamValidation = [
    param("id")
        .isMongoId()
        .withMessage("Valid Volunteer ID parameter is required"),
    validate
];

module.exports = {
    registerVolunteerValidation,
    updateVolunteerValidation,
    scanTicketValidation,
    volunteerIdParamValidation
};
