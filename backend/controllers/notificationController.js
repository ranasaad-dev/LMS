const Notification = require("../models/notificationModel.js");

exports.createNotification = async (req, res) => {
    const { title, body } = req.body;
    const NewNotification = await Notification.create({
        title: title,
        body: body,
    });
    res.status(201).json(NewNotification);
}

exports.getNotification = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        if (!notifications) return res.status(404).json({ "message": "No notification found." });

        return res.json(notifications);
    } catch (err) {
        res.json({ message: err.message });
    }
}

exports.updateNotification = async (req, res) => {
    const { title, body } = req.body;
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, {
            title: title,
            body: body
        }, { new: true });
        if (!notification) {
            res.json({ 'message': 'Notification not found' });
            return null;
        }

        res.json(notification);
    } catch (err) {
        res.json({ message: err.message });
    }
}

exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);

        if (!notification) {
            res.json({ 'message': 'Notification not found' });
            return null;
        }
        res.json(notification);
    } catch (err) {
        res.json({ message: err.message });
    }
}