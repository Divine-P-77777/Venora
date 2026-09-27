const express = require("express")
const router = express.Router()
const eventController = require("../controllers/event.controller")
const { AuthenticateUser } = require("../middlewares/auth.middlewares")


router.post("/register", eventController.registerEvent)
router.post("/update", AuthenticateUser, eventController.updateEvent)
router.post("/delete", AuthenticateUser, eventController.deleteEvent)




module.exports = router;