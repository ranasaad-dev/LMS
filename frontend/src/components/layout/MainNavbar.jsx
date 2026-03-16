
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaGraduationCap, FaUserCircle } from "react-icons/fa";
import { useAuth } from "/src/context/AuthContext";
import Sidebar from "./Sidebar";
import "./MainNavbar.css";

function MainNavbar() {
  const token = localStorage.getItem("token");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();

  if (loading) return null;
const redhome = ()=>{
  if(token) {return `/dashboard/${user._id}`}else{return "/"}
}
const lochome = redhome();
  return (
    <nav>
      <div className="navbar-fp">
      <Link to={lochome}><FaGraduationCap className="navbar-logo"/><p>LMS</p></Link>
      </div>
     

      <div className="navbar-sp">
        {!token && (
          <>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register"><button > Register </button></Link>
          </>)}
      {token && (<>
          <p>{user.name}</p>
         <FaUserCircle className="profile-icon" onClick={() => setSidebarOpen(true)} /> 
      </>
         )}
      </div>


<Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
    </nav>
  );
}

export default MainNavbar;
