const express = require("express");
const router = express.Router();
const { AuthenticateUser } = require("../middlewares/auth.middleware");
const { AuthenticateApprovedOrg } = require("../middlewares/check-organizer.middleware");
const organizerController = require("../controllers/organizer.controller");
const {
    registerOrganizerValidation,
    onboardingRepresentativeValidation
} = require("../validators/organizer.validator");

router.post("/register", AuthenticateUser, registerOrganizerValidation, organizerController.registerOrganizer);
router.post("/orgonboarding", AuthenticateUser, AuthenticateApprovedOrg, onboardingRepresentativeValidation, organizerController.onboardingOrganizer);

module.exports = router;