const { body } = require("express-validator");
const { validate } = require("../middlewares/validate.middleware");

const registerValidation = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3, max: 30 })
        .withMessage("Username must be between 3 and 30 characters"),
    body("email")
        .trim()
        .isEmail()
        .withMessage("A valid email address is required"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("role")
        .notEmpty()
        .withMessage("Role ID is required")
        .isMongoId()
        .withMessage("Invalid Role ID format"),
    validate
];

module.exports = {
    registerValidation
};
