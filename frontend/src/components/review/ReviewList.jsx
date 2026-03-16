import { Card } from "react-bootstrap";

function ReviewList({ reviews }) {

  if (!reviews.length) {
    return <p>No reviews yet.</p>;
  }

  return (
    <>
      {reviews.map((review) => (
        <Card key={review._id} className="mb-3">

          <Card.Body>

            <strong>{review.user?.name}</strong>

            <p className="mb-1">
              Rating: {review.rating}/5
            </p>

            <p>{review.comment}</p>

          </Card.Body>

        </Card>
      ))}
    </>
  );
}

export default ReviewList;