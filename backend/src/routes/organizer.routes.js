const express = require("express")
const router = express.Router()
const { AuthenticateUser } = require("../middlewares/auth.middlewares")
const organizerController = require("../controllers/organizer.controller")


router.post("/register", AuthenticateUser, organizerController.registerOrganizer)


module.exports = router;