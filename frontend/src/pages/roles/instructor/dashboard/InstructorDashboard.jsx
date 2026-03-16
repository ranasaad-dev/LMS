import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaBookOpen } from "react-icons/fa";
import courseService from "../../../../services/courseService";
import { useAuth } from "../../../../context/AuthContext";

import "./InstructorDashboard.css";

function InstructorDashboard() {

  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCourses = async () => {
      try {

        const data = await courseService.getAllCourses();

        const instructorCourses = data.filter(
          (course) => course.instructor?._id === user._id || course.instructor === user._id
        );

        setCourses(instructorCourses);

      } catch (error) {
        console.error("Failed to load courses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();

  }, [user]);

  return (
    <div className="instructor-dashboard">

      <div className="dashboard-header">

        <h2>Instructor Dashboard</h2>

        <Link to="/create-course" className="create-course-btn">
          <FaPlus />
          Create Course
        </Link>

      </div>

      {loading ? (
        <p className="dashboard-loading">Loading courses...</p>
      ) : courses.length === 0 ? (

        <div className="empty-courses">

          <FaBookOpen className="empty-icon" />

          <p>You haven't created any courses yet.</p>

          <Link to="/create-course" className="create-first-course">
            Create Your First Course
          </Link>

        </div>

      ) : (

        <div className="course-grid">

          {courses.map((course) => (

            <div className="course-card" key={course._id}>

              <div className="course-info">

                <h3>{course.title}</h3>

                <p>{course.description}</p>

                <span className="course-price">
                  ${course.price}
                </span>

              </div>

              <Link
                to={`/manage-course/${course._id}`}
                className="manage-btn"
              >
                Manage Course
              </Link>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default InstructorDashboard;