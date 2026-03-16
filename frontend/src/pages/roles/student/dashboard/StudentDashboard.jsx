import { Link } from "react-router-dom";
import { FaBookOpen, FaSearch, FaUserGraduate } from "react-icons/fa";
import { useAuth } from "/src/context/AuthContext";
import "./StudentDashboard.css";

function StudentDashboard() {

    const { user } = useAuth();

    return (

        <div className="dashboard-container">

            <h2 className="dashboard-title">Student Dashboard</h2>

            {user && <p className="dashboard-welcome">Welcome back, {user.name}</p>}

            <div className="dashboard-grid">

                <div className="dashboard-card">
                    <FaBookOpen className="dashboard-icon" />
                    <h4>My Courses</h4>
                    <Link to="/my-courses" className="dashboard-link">View Courses</Link>

                </div>

                <div className="dashboard-card">

                    <FaSearch className="dashboard-icon" />

                    <h4>Browse Courses</h4>

                    <Link to="/courses" className="dashboard-link">Explore</Link>

                </div>

                <div className="dashboard-card">

                    <FaUserGraduate className="dashboard-icon" />

                    <h4>Profile</h4>

                    <Link to="/profile" className="dashboard-link">View Profile</Link>

                </div>

            </div>

        </div>

    );

}

export default StudentDashboard;