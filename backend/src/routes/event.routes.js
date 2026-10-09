const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const { AuthenticateUser } = require("../middlewares/auth.middlewares");
const { AuthenticateApprovedOrg } = require("../middlewares/check-organizer.middleware");
const {
    eventRegisterValidation,
    eventUpdateValidation
} = require("../validators/event.validator");

router.post("/register", AuthenticateUser, AuthenticateApprovedOrg, eventRegisterValidation, eventController.registerEvent);
router.post("/update/:id", AuthenticateUser, AuthenticateApprovedOrg, eventUpdateValidation, eventController.updateEvent);
router.post("/delete/:id", AuthenticateUser, AuthenticateApprovedOrg, eventController.deleteEvent);

module.exports = router;