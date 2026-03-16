import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import apiClient from "../../../../services/apiClient"; // Axios instance
import "./EditStudentProfile.css";

function EditStudentProfile() {
  const { user, setUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset message
    setMessage("");

    // If changing password, currentPassword must be provided
    if (newPassword && !currentPassword) {
      setMessage("Please enter your current password to change it");
      return;
    }

    // Build dynamic update object
    const updateFields = {};
    if (name !== user.name) updateFields.name = name;
    if (email !== user.email) updateFields.email = email;
    if (newPassword) {
      updateFields.password = newPassword;
      updateFields.currentPassword = currentPassword;
    }

    if (Object.keys(updateFields).length === 0) {
      setMessage("No changes detected");
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.put(`/users/${user._id}`, updateFields);

      setUser(response.data); // Update context
      setMessage("Profile updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Failed to update profile");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Edit Profile</h2>
      <div className="profile-card">
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="profile-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
          </div>

          <div className="profile-group">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Required if changing password"
            />
          </div>

          <div className="profile-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Leave empty if not changing"
            />
          </div>

          <button type="submit" className="profile-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>

          {message && <p className="profile-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditStudentProfile;