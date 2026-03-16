import "./Dashboard.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import StudentDashboard from "../roles/student/dashboard/StudentDashboard";
import InstructorDashboard from "../roles/instructor/dashboard/InstructorDashboard";
import AdminDashboard from "../roles/admin/dashboard/AdminDashboard";

function Dashboard() {

  const { id } = useParams();
  const {user} = useAuth();

  
  if (!user || user._id.trim() !== id.trim()) {
    return <h2>Unauthorized Access</h2>;
  }

  if (user.role === "admin") {
    return (
    <AdminDashboard />

)
  }

  if (user.role === "instructor") {
    return (
        <InstructorDashboard />
    )
  }

  return (
    <StudentDashboard />
  )

}
export default Dashboard;