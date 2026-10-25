const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const { AuthenticateUser } = require("../middlewares/auth.middleware");
const { AuthenticateApprovedOrg } = require("../middlewares/check-organizer.middleware");
const {
    eventRegisterValidation,
    eventUpdateValidation
} = require("../validators/event.validator");
const { createUploadStreamMiddleware } = require("../middlewares/uploadStream.middleware");

// Zero-RAM streaming upload middleware configured for event media
const uploadEventMediaStream = createUploadStreamMiddleware({
    folder: "VENORA/events",
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5
});

router.get("/get-events", AuthenticateUser, eventController.getAllEvents);
router.get("/get-event/:id", AuthenticateUser, eventController.getEvent);
router.post("/register", AuthenticateUser, AuthenticateApprovedOrg, eventRegisterValidation, eventController.registerEvent);
router.post("/update/:id", AuthenticateUser, AuthenticateApprovedOrg, eventUpdateValidation, eventController.updateEvent);
router.post("/delete/:id", AuthenticateUser, AuthenticateApprovedOrg, eventController.deleteEvent);
router.post("/upload-media", AuthenticateUser, AuthenticateApprovedOrg, uploadEventMediaStream, eventController.uploadMedia);

module.exports = router;