import { useState, useEffect } from "react";
import notificationService from "../../../services/notificationService";
import notify from "../../../components/ui/notify/Notify";
import { useAuth } from "../../../context/AuthContext";
import Loading from "/src/components/ui/Loading"
import "./Notification.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function Notification() {
    const [notification, setNotification] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const { user, loading } = useAuth();
    const [formData, setFormData] = useState({
        title: "",
        body: ""
    });

    const getNotificationObject = async () => {
        try {
            const response = await notificationService.getNotification();
            setNotification(response);
        } catch (err) {
            notify(err.message, "error");
        }
    };

    useEffect(() => {
        getNotificationObject();
    }, []);

    // DELETE
    const deleteNotification = async (id) => {
        try {
            await notificationService.deleteNotification(id);
            setNotification(prev => prev.filter(n => n._id !== id));
        } catch (err) {
            notify(err.message, "error");
        }
    };

    // OPEN CREATE
    const handleAdd = () => {
        setIsEdit(false);
        setFormData({ title: "", body: "" });
        setShowModal(true);
    };

    // OPEN EDIT
    const handleEdit = (n) => {
        setIsEdit(true);
        setCurrentId(n._id);
        setFormData({ title: n.title, body: n.body });
        setShowModal(true);
    };

    // HANDLE INPUT
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // SUBMIT FORM
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                const updated = await notificationService.updateNotification(currentId, formData);

                setNotification(prev =>
                    prev.map(n => (n._id === currentId ? updated : n))
                );
            } else {
                const created = await notificationService.createNotification(formData);
                setNotification(prev => [created, ...prev]);
            }

            setShowModal(false);
        } catch (err) {
            notify(err.message, "error");
        }
    };

    return (
        !loading ? <div className="notice-board-parent-container">
            <div className="head">

                <h1>Notice Board</h1>
                {/* ADD BUTTON */}
                {user.role != "student" ?
                    <button className="add-btn mg-t" onClick={handleAdd}>
                        <FaPlus /> Add
                    </button> : null}
            </div>

            <div className="notice-board-container">
                {notification.map((n) => (
                    <div key={n._id} className="notification-card">

                        <div className="notification-header">
                            <h4>{n.title}</h4>

                            {user.role !== "student" && (
                                <div className="notification-actions">
                                    <FaEdit onClick={() => handleEdit(n)} />
                                    <FaTrash onClick={() => deleteNotification(n._id)} />
                                </div>
                            )}
                        </div>

                        <p className="notification-body">{n.body}</p>
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

            {/* MODAL */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{isEdit ? "Edit Notification" : "Add Notification"}</h3>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                            <input type="text" classNale="textarea" name="body" placeholder="Body" value={formData.body} onChange={handleChange} required />
                            <div className="modal-actions">
                                <button className="add-btn" type="submit">
                                    {isEdit ? "Update" : "Create"}
                                </button>
                                <button className="add-btn btn-cancel" type="button" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div> : <Loading />
    );
}

export default Notification;