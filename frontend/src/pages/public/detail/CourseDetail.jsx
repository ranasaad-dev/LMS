import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CourseDetail.css";
import { FaUserGraduate, FaDollarSign, FaLayerGroup, FaStar } from "react-icons/fa";
import enrollmentService from "../../../services/enrollmentService";

const CourseDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const token = localStorage.getItem("token")

const enrollment = async (e) => {
  e.preventDefault();

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    setLoading(true);
    const res = await enrollmentService.enrollInCourse(id);
    console.log("Enrollment success:", res.data);
    navigate("/my-courses")
  } catch (error) {
    console.error("Enrollment failed:", error);

    if (error.response?.status === 401) {
      navigate("/login");
    } else {
      alert("Failed to enroll in course.");
    }
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/courses/${id}`);
        setCourse(data);
      } catch (err) {
        setError("Failed to load course. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div className="course-detail-loading">Loading course...</div>;
  if (error) return <div className="course-detail-error">{error}</div>;
  if (!course) return <div className="course-detail-error">Course not found.</div>;

  return (
    <div className="course-detail-container">
      <div className="course-detail-card">
        <div className="course-detail-image">
          <img src={course.thumbnail} alt={course.title} />
        </div>
        <div className="course-detail-content">
          <div>
            <h1 className="course-detail-title">{course.title}</h1>
            <p className="course-detail-desc">{course.description}</p>
          </div>

          <div className="course-detail-meta-container">
            <div className="course-detail-meta">
              <span><FaUserGraduate /> {course.instructor.name}</span>
              <span><FaLayerGroup /> {course.category}</span>
              <span><FaStar /> {course.rating || 0}</span>
              <span><FaDollarSign /> {course.price.toFixed(2)}</span>
            </div>
            <div className="course-detail-enroll">
              <button className="enroll-btn" onClick={enrollment}>Enroll Now</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetail;