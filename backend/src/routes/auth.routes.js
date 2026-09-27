const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth.controller")
const { AuthenticateUser } = require("../middlewares/auth.middlewares")


router.post("/register", authController.profileRegister)
router.post("/login", authController.profileLogin)
router.post("/logout", authController.profileLogout)
router.get("/profile", AuthenticateUser, authController.getProfile)




module.exports = router;