// Testimonials.jsx
import React, { useState, useEffect } from "react";
import "./Testimonials.css";

const testimonials = [
  {
    text: "“The cybersecurity courses helped me understand real-world security practices. The hands-on labs made learning practical and engaging.”",
    name: "Alex P.",
    role: "Cybersecurity Student",
  },
  {
    text: "“The AI learning path is well structured and easy to follow. I was able to build my first machine learning project.”",
    name: "Sofia L.",
    role: "AI Student",
  },
  // You can add more testimonials here
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const length = testimonials.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [current, length]);

  return (
    <section className="testimonials-section">
      <h3>What Our Learners Say</h3>
      <div className="testimonial-slider">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={index === current ? "testimonial-slide active" : "testimonial-slide"}
          >
            <p>{testimonial.text}</p>
            <span className="testimonial-author">
              {testimonial.name} — {testimonial.role}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;