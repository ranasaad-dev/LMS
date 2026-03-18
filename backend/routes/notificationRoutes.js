const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/notificationController");

router.get("/", notificationController.getNotification);
router.post("/", notificationController.createNotification);

module.exports = router;