const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required."]
    },
    body: {
        type: String,
        required: [true, "Body is required."]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Notifications = mongoose.model("Notification", notificationSchema);

module.exports = Notifications;