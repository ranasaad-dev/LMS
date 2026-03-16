import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";

import "./StudentProfile.css";

function StudentProfile() {

  const { user } = useAuth();


  return (

    <div className="profile-container">
      <h2 className="profile-title">Student Profile</h2>
      <div className="profile-card">

        <h4>{"Name: " + user.name}</h4>
        <h4>{"Email: " + user.email}</h4>

      </div>
        <Link to="/edit-profile" className="profile-btn">Update Profile</Link>

    </div>

  );

}

export default StudentProfile;