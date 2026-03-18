import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  FaEdit,
  FaTrash,
  FaPlusCircle,
  FaUsers,
  FaStar
} from "react-icons/fa";

import courseService from "../../../../services/courseService";

import "./ManageCourse.css";

function CourseManage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCourse = async () => {
      try {

        const data = await courseService.getCourseById(id);
        setCourse(data);

      } catch (error) {
        console.error("Failed to load course", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();

  }, [id]);

  const handleDeleteCourse = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {

      await courseService.deleteCourse(id);

      navigate("dashboard");

    } catch (error) {
      console.error("Delete failed", error);
    }

  };

  if (loading) {
    return <div className="manage-loading">Loading course...</div>;
  }

  return (
    <div className="course-manage">

      <div className="course-header">

        <div>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
        </div>

        <button
          className="delete-course-btn"
          onClick={handleDeleteCourse}
        >
          <FaTrash className="delete-course-icon" />
          Delete Course
        </button>

      </div>

      <div className="manage-grid">

        <div
          className="manage-card"
          onClick={() => navigate(`/course/${id}/edit`)}
        >
          <FaEdit className="manage-icon" />
          <h3>Edit Course</h3>
          <p>Update title, price, description and thumbnail.</p>
        </div>

        <div
          className="manage-card"
          onClick={() => navigate(`/course/${id}/add-lesson`)}
        >
          <FaPlusCircle className="manage-icon" />
          <h3>Add Lessons</h3>
          <p>Create and manage lessons for this course.</p>
        </div>

        <div
          className="manage-card"
          onClick={() => navigate(`/course/${id}/students`)}
        >
          <FaUsers className="manage-icon" />
          <h3>View Students</h3>
          <p>See students enrolled in this course.</p>
        </div>

        <div
          className="manage-card"
          onClick={() => navigate(`/course/${id}/reviews`)}
        >
          <FaStar className="manage-icon" />
          <h3>View Reviews</h3>
          <p>Check ratings and feedback from students.</p>
        </div>

      </div>

    </div>
  );
}

export default CourseManage;