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
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [animating, setAnimating] = useState(false);

  const length = testimonials.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimating(true);

      setTimeout(() => {
        const newCurrent = next;
        const newNext = (next + 1) % length;

        setCurrent(newCurrent);
        setNext(newNext);
        setAnimating(false);
      }, 1000); // animation duration
    }, 3000); // stay time

    return () => clearTimeout(timer);
  }, [current, next, length]);

  return (
    <section className="testimonials-section">
      <h3>What Our Learners Say</h3>

      <div className="testimonial-slider">
        {testimonials.map((testimonial, index) => {
          let className = "testimonial-slide";

          if (index === current) {
            className += animating ? " slide-out" : " active";
          } else if (index === next) {
            className += animating ? " slide-in" : "";
          }

          return (
            <div key={index} className={className}>
              <p>{testimonial.text}</p>
              <span className="testimonial-author">
                {testimonial.name} — {testimonial.role}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;