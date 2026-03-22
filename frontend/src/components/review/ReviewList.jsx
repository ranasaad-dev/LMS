import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import reviewService from "/src/services/reviewService";
import notify from "/src/components/ui/notify/Notify";

function ReviewList({r, sr}) {

  const { courseId } = useParams();
  const [reviewLoading, setReviewLoading] = useState(true);


    const fetchReviews = async () => {
      try {
        setReviewLoading(true);
        const data = await reviewService.getCourseReviews(courseId);
        sr(data);
      } catch (err) {
        notify(`Failed to load reviews: ${err}`, "error");
      } finally {
        setReviewLoading(false);
      }
    };
  
    useEffect(() => { 
        fetchReviews();
      }, [courseId]);
    

  return (
    <div className="review-list">
    {reviewLoading ? (
      <p className="review-loading">Loading reviews...</p>
    ) : r.length === 0 ? (
      <p className="review-empty">No reviews yet.</p>
    ) : (
      r.map((rev) => (
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
  );
}

export default ReviewList;