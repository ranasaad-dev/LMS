const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");


const notificationController = require("../controllers/notificationController");

router.get("/", notificationController.getNotification);
router.post("/", protect, notificationController.createNotification);
router.put("/:id", protect, notificationController.updateNotification);
router.delete("/:id", protect, notificationController.deleteNotification)
module.exports = router;