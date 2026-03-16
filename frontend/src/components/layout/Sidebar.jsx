import React, { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBookOpen, FaUser, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

function Sidebar({ isOpen, closeSidebar }) {

  const { logout, user } = useAuth();

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const sidebarRef = useRef();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  // close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        closeSidebar();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeSidebar]);

  return (
    <div className={`sidebar-overlay ${isOpen ? "show" : ""}`}>
      <aside ref={sidebarRef} className={`sidebar-drawer ${isOpen ? "open" : ""}`} >
        <div>

          <div className="sidebar-logo">
            {user ? <h2>{user.name}</h2> : <h2>Login</h2>}
          </div>

          <nav className="sidebar-navigation">

            {token && (
              <NavLink to={`/dashboard/${user._id}`} className="sidebar-link">
                <FaTachometerAlt /> <span>Dashboard</span>
              </NavLink>
            )}
            {(token && user.role === "student") && (
              <NavLink to="/my-courses" className="sidebar-link">
                <FaBookOpen /> <span>My Courses</span>
              </NavLink>
            )}

            {token && (
              <NavLink to="/profile" className="sidebar-link">
                <FaUser /> <span>Profile</span>
              </NavLink>
            )}

            <NavLink to="/about" className="sidebar-link">
              <FaInfoCircle /> <span>About</span>
            </NavLink>

          </nav>

        </div>
        {token && (
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        )}
      </aside>
    </div>
  );
}

export default Sidebar;