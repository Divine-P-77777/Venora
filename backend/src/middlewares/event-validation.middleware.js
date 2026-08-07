const { body, param, query, validationResult } = require('express-validator')





const validateResult = async (req, res, next) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();

}



const eventRegisterValidation = [
    body("eventName")
        .isString()
        .notEmpty()
        .withMessage("Event name is required")
        .isLength({ min: 3, max: 40 }),
    body("email")
        .isString()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
    ,
    body("phone")
        .isString()
        .isLength({ min: 10, max: 15 })
        .withMessage("Phone number is required")
    ,
    body("organizername")
        .isString()
        .isLength({ min: 7, max: 50 })
        .withMessage("Organizer name is required")
        .isAlpha()
    ,
    body("catagory")
        .isArray()
        .withMessage("Catagory is required")


]