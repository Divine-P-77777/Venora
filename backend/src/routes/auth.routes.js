const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { AuthenticateUser } = require("../middlewares/auth.middleware");
const { rateLimitMiddleware } = require("../middlewares/rate-limit.middleware");
const { registerValidation, loginValidation } = require("../validators/auth.validator");

router.post("/register", rateLimitMiddleware(60 * 60 * 1000, 10), registerValidation, authController.profileRegister);
router.post("/login", rateLimitMiddleware(60 * 60 * 1000, 10), loginValidation, authController.profileLogin);
router.post("/google/login", rateLimitMiddleware(60 * 60 * 1000, 10), authController.googleLogin);
router.post("/google/signup", rateLimitMiddleware(60 * 60 * 1000, 5), authController.googleSignUp);
router.post("/refresh", authController.refreshToken);
router.post("/logout", authController.profileLogout);
router.get("/profile", AuthenticateUser, authController.getProfile);

module.exports = router;