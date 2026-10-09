const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { AuthenticateUser } = require("../middlewares/auth.middlewares");
const { AuthenticateAdmin } = require("../middlewares/check-admin.middlewares");

router.post("/approve/:id", AuthenticateUser, AuthenticateAdmin, adminController.approvedOrganizer);
router.post("/reject/:id", AuthenticateUser, AuthenticateAdmin, adminController.rejectedOrganizer);

module.exports = router;