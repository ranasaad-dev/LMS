import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBook, FaDollarSign, FaImage } from "react-icons/fa";

import courseService from "../../../../services/courseService";

import "./CreateCourse.css";

function CreateCourse() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    thumbnail: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { title, description, price, category, thumbnail } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category) {
      setError("Please fill all required fields.");
      return;
    }

    try {

      setLoading(true);
      setError("");

      const newCourse = await courseService.createCourse(formData);

      navigate(`/courses/${newCourse._id}`);

    } catch (err) {
      console.error(err);
      setError("Failed to create course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-course-page">

      <div className="create-course-container">

        <h2>Create New Course</h2>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit} className="create-course-form">

          <div className="form-group">
            <label>Course Title</label>

            <div className="input-group">
              <FaBook />
              <input
                type="text"
                name="title"
                placeholder="Enter course title"
                value={title}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Write course description..."
              value={description}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Price ($)</label>

              <div className="input-group">
                <FaDollarSign />
                <input
                  type="number"
                  name="price"
                  placeholder="49"
                  value={price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Category</label>

              <input
                type="text"
                name="category"
                placeholder="Web Development"
                value={category}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-group">
            <label>Thumbnail URL</label>

            <div className="input-group">
              <FaImage />
              <input
                type="text"
                name="thumbnail"
                placeholder="https://image-url.com/course.jpg"
                value={thumbnail}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="create-course-btn"
            disabled={loading}
          >
            {loading ? "Creating Course..." : "Create Course"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateCourse;