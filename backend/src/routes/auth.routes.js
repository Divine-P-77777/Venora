const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth.controller")
// const validationRules = require("../middlewares/validation.middleware")


router.post("/register", authController.profileRegister)
router.post("/login", authController.profileLogin)
router.post("/logout", authController.profileLogout)
router.get("/profile", authController.getProfile)




module.exports = router;