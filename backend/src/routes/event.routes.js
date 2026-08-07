const express = require("express")
const router = express.Router()
const eventController = require("../controllers/event.controller")

router.post("/register", eventController.registerEvent)
router.post("/update", eventController.updateEvent)
router.post("/delete", eventController.deleteEvent)




module.exports = router;