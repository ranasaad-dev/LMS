import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function ReviewForm({ onSubmit }) {

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      rating,
      comment,
    });

    setComment("");
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">

      <Form.Group className="mb-2">

        <Form.Label>Rating</Form.Label>

        <Form.Select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </Form.Select>

      </Form.Group>

      <Form.Group className="mb-2">

        <Form.Label>Comment</Form.Label>

        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

      </Form.Group>

      <Button type="submit">
        Submit Review
      </Button>

    </Form>
  );
}

export default ReviewForm;