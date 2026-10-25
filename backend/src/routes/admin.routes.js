const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { AuthenticateUser } = require("../middlewares/auth.middleware");
const { AuthenticateAdmin } = require("../middlewares/check-admin.middleware");

router.post("/approve/:id", AuthenticateUser, AuthenticateAdmin, adminController.approvedOrganizer);
router.post("/reject/:id", AuthenticateUser, AuthenticateAdmin, adminController.rejectedOrganizer);

module.exports = router;