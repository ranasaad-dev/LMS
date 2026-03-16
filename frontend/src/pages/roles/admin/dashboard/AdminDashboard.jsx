import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaUsers, FaBook, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import adminService from "../../../../services/adminService.js";
import courseService from "../../../../services/courseService.js";
import Loading from "../../../../components/ui/Loading.jsx";
import "./AdminDashboard.css";

function AdminDashboard() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadData = async () => {

            try {

                const usersData = await adminService.getUsers();
                const coursesData = await courseService.getAllCourses();
                setUsers(usersData || []);
                setCourses(coursesData || []);

            } catch (err) {

                console.error("Dashboard load error", err);

            } finally {

                setLoading(false);

            }

        };

        loadData();

    }, []);

    const students = users.filter(u => u.role === "student").length;
    const instructors = users.filter(u => u.role === "instructor").length;
    const admins = users.filter(u => u.role === "admin").length;
    if (loading) return <Loading />;

    return (

        <div className="admin-dashboard">

            <h1 className="admin-title">Admin Dashboard</h1>

            <div className="admin-cards">
               
                <div className="admin-card" onClick={() => navigate(`/dashboard/${id}/users`)}>
                    <div className="admin-icon users"><FaUsers /></div>
                    <h3>Total Users</h3>
                    <p>{users.length}</p>
                </div>
                <div className="admin-card"><div className="admin-icon students"><FaUserGraduate /></div><h3>Total Students</h3><p>{students}</p></div>
                <div className="admin-card"><div className="admin-icon instructors"><FaChalkboardTeacher /></div><h3>Total Instructors</h3><p>{instructors}</p></div>
                <div className="admin-card" onClick={() => navigate(`/dashboard/${id}/courses`)}><div className="admin-icon courses"><FaBook /></div><h3>Total Courses</h3><p>{courses.length}</p></div>
           
            </div>

            <div className="admin-extra">
                <div className="admin-small-card"><h4>Admins</h4><p>{admins}</p></div>
                <div className="admin-small-card"><h4>Platform Status</h4><p>Active</p></div>
            </div>

        </div>

    );
}

export default AdminDashboard;