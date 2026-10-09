const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteer.controller");
const { AuthenticateUser } = require("../middlewares/auth.middlewares");
const { AuthenticateApprovedOrg } = require("../middlewares/check-organizer.middleware");
const {
    registerVolunteerValidation,
    updateVolunteerValidation,
    scanTicketValidation,
    volunteerIdParamValidation
} = require("../validators/volunteer.validator");

router.post("/register", AuthenticateUser, registerVolunteerValidation, volunteerController.registerVolunteer);
router.get("/:id", AuthenticateUser, volunteerIdParamValidation, volunteerController.getVolunteer);
router.patch("/update/:id", AuthenticateUser, AuthenticateApprovedOrg, updateVolunteerValidation, volunteerController.updateVolunteer);
router.delete("/delete/:id", AuthenticateUser, AuthenticateApprovedOrg, volunteerIdParamValidation, volunteerController.deleteVolunteer);
router.patch("/scan/:id", AuthenticateUser, scanTicketValidation, volunteerController.scanTicketbyVolunteer);

module.exports = router;