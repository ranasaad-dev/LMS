import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import lessonService from "../../../../services/lessonService";
import progressService from "../../../../services/progressService";
import reviewService from "../../../../services/reviewService";
import LessonPlayer from "../../../../components/lesson/LessonPlayer";
import ProgressBar from "../../../../components/ui/ProgressBar";

import { FaPlayCircle } from "react-icons/fa";

import "./Learn.css";

function Learn() {
  const { courseId } = useParams();
  const [review, setReview] = useState({
    rating: 5,
    comment: ""
  });
  
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [progress, setProgress] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setReviewLoading(true);
  
        const data = await reviewService.getCourseReviews(courseId);
  
        setReviews(data);
  
      } catch (err) {
        console.error("Failed to load reviews", err);
      } finally {
        setReviewLoading(false);
      }
    };
  
    const fetchLessons = async () => {
      try {
        setLoading(true);

        const data = await lessonService.getLessonsByCourse(courseId);

        setLessons(data);

        if (data.length > 0) {
          setCurrentLesson(data[0]);
        }

      } catch (err) {
        console.error(err);
        setError("Failed to load lessons");
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
    fetchLessons();
  }, [courseId]);

  const handleSubmitReview = async () => {
    if (!review.comment.trim()) return;
  
    try {
  
      const newReview = await reviewService.createReview(courseId, review);
  
      setReviews((prev) => [newReview, ...prev]);
  
      setReview({
        rating: 5,
        comment: ""
      });
  
    } catch (err) {
      alert("Already Submited Review.");
    }
  };

  const handleLessonClick = async (lesson, index) => {
    setCurrentLesson(lesson);

    const newProgress = Math.round(((index + 1) / lessons.length) * 100);

    setProgress(newProgress);

    try {
      await progressService.updateProgress(courseId, newProgress);
    } catch (err) {
      console.error("Progress update failed", err);
    }
  };

  if (loading) {
    return <div className="course-player-loading">Loading lessons...</div>;
  }

  if (error) {
    return <div className="course-player-error">{error}</div>;
  }

  return (
    <div className="course-player">

      <div className="lesson-sidebar">

        <h3 className="sidebar-title">Lessons</h3>

        <div className="lesson-list">
          {lessons.map((lesson, index) => (
            <div
              key={lesson._id}
              className={`lesson-item ${
                currentLesson?._id === lesson._id ? "active" : ""
              }`}
              onClick={() => handleLessonClick(lesson, index)}
            >
              <FaPlayCircle className="lesson-icon" />

              <span className="lesson-title">
                {index + 1}. {lesson.title}
              </span>

            </div>
          ))}
        </div>

      </div>

      <div className="lesson-content">

        <ProgressBar progress={progress} />

        <div className="video-wrapper">
          <LessonPlayer lesson={currentLesson} />
        </div>
        
  <div className="review-list">

    {reviewLoading ? (
      <p className="review-loading">Loading reviews...</p>
    ) : reviews.length === 0 ? (
      <p className="review-empty">No reviews yet.</p>
    ) : (
      reviews.map((rev) => (
        <div key={rev._id} className="review-card">

          <div className="review-header">

            <span className="review-user">
              {rev.student?.name || "Student"}
            </span>

            <span className="review-rating">
              {"⭐".repeat(rev.rating)}
            </span>

          </div>

          <p className="review-comment">{rev.comment}</p>

        </div>
      ))
    )}

  </div>
      </div>

<div className="review-section">

  <h3 className="review-title">Course Reviews</h3>

  <div className="review-form">

    <div className="rating-select">

      <label>Rating</label>

      <select
        value={review.rating}
        onChange={(e) =>
          setReview({ ...review, rating: Number(e.target.value) })
        }
      >
        <option value={5}>5 ⭐</option>
        <option value={4}>4 ⭐</option>
        <option value={3}>3 ⭐</option>
        <option value={2}>2 ⭐</option>
        <option value={1}>1 ⭐</option>
      </select>

    </div>

    <textarea
      className="review-input"
      placeholder="Write your review..."
      value={review.comment}
      onChange={(e) =>
        setReview({ ...review, comment: e.target.value })
      }
    />

    <button
      className="review-submit"
      onClick={handleSubmitReview}
    >
      Submit Review
    </button>

  </div>


</div>
</div>
   
  );
}

export default Learn;