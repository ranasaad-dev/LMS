import React, { useState, useEffect } from "react";
import "./StudentBenefits.css";

const benefits = [
  {
    title: "Practical tech skills",
    img: "/skill.jpeg",
  },
  {
    title: "Industry-relevant knowledge",
    img: "/industry.jpeg",
  },
  {
    title: "Hands-on project experience",
    img: "/labs.jpeg",
  },
  {
    title: "Career-ready portfolio",
    img: "/carrier.jpeg",
  },
  {
    title: "Certificates of completion",
    img: "/certification.jpeg",
  },
];

const StudentBenefits = () => {
  const [current, setCurrent] = useState(0);
  const length = benefits.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [length]);

  return (
    <section
    className="student-gain-carousel-split"
    style={{ backgroundImage: `url(${benefits[current].img})` }}
  >
    <div className="carousel-overlay">
      <div className="carousel-left">
        <h3>{benefits[current].title}</h3>
      </div>
      <div className="carousel-right">
        <p>
          Enhance your career with skills that are in-demand across top tech industries.
        </p>
      </div>
    </div>
  </section>
  );
};

export default StudentBenefits;