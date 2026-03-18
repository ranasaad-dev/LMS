const Notification = require("../models/notificationModel.js");

exports.createNotification = async (req, res) =>{
   const {title, body} = req.body;
   const NewNotification = await Notification.create({
    title: title,
    body: body,
   });
   res.status(201).json(NewNotification);
}

exports.getNotification = async (req, res) => {
    try{
        const notifications = await Notification.find();
        if(!notifications) return res.status(404).json({"message":"No notification found."});
           
           return res.json(notifications);
    }catch(err){
        res.json({message: err.message});
    }
}