import { useState, useEffect } from "react";
import notificationService from "../../../services/notificationService";
import "./Notification.css";


function Notification() {
    const [notification, setNotification] = useState([]);

    const getNotificationObject = async () => {
        try {
            const response = await notificationService.getNotification();
            setNotification(response);
            console.log(response);
        } catch (err) {
            console.log(err.message);
        }
    }
    
    useEffect(() => {
        getNotificationObject()
      
    }, [])

    return (
        <div className="notice-board-parent-container">
        <h1>Notice Board</h1>
        <div className="notice-board-container">
        {notification.map((n) => (
            <div key={n._id} className="notification-card">
            <h4>{n.title}</h4>
            <p>{n.body}</p>
            <span className="notification-date">
          {new Date(n.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
          </div>
        ))}
      </div>
        </div>
    )
}

export default Notification;