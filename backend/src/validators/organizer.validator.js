const { body } = require("express-validator");
const { validate } = require("../middlewares/validate.middleware");

const registerOrganizerValidation = [
    body("organizationName")
        .trim()
        .notEmpty()
        .withMessage("Organization name is required")
        .isLength({ min: 2, max: 150 })
        .withMessage("Organization name must be between 2 and 150 characters"),
    body("organizationType")
        .trim()
        .notEmpty()
        .withMessage("Organization type is required"),
    body("registeredAddress")
        .trim()
        .notEmpty()
        .withMessage("Registered address is required"),
    body("city")
        .trim()
        .notEmpty()
        .withMessage("City is required"),
    body("state")
        .trim()
        .notEmpty()
        .withMessage("State is required"),
    body("pincode")
        .trim()
        .notEmpty()
        .withMessage("Pincode is required")
        .isLength({ min: 5, max: 10 })
        .withMessage("Pincode must be between 5 and 10 characters"),
    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .isMobilePhone("any")
        .withMessage("Please enter a valid phone number"),
    body("website")
        .optional({ checkFalsy: true })
        .isURL()
        .withMessage("Website must be a valid URL"),
    body("pan")
        .trim()
        .notEmpty()
        .withMessage("PAN is required")
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i)
        .withMessage("Please enter a valid 10-character PAN number"),
    body("gstin")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 15, max: 15 })
        .withMessage("GSTIN must be 15 characters long"),
    validate
];

const onboardingRepresentativeValidation = [
    body("representativeName")
        .trim()
        .notEmpty()
        .withMessage("Representative name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Representative name must be between 2 and 100 characters"),
    body("representativeDesignation")
        .trim()
        .notEmpty()
        .withMessage("Representative designation is required"),
    body("representativeEmail")
        .trim()
        .isEmail()
        .withMessage("Valid representative email is required"),
    body("representativePhone")
        .trim()
        .notEmpty()
        .withMessage("Representative phone is required")
        .isMobilePhone("any")
        .withMessage("Valid representative phone number is required"),
    body("representativePan")
        .trim()
        .notEmpty()
        .withMessage("Representative PAN is required"),
    body("representativeKycDocument")
        .trim()
        .notEmpty()
        .withMessage("Representative KYC document is required"),
    validate
];

module.exports = {
    registerOrganizerValidation,
    onboardingRepresentativeValidation
};
