import React, { useEffect } from "react";
import "./About.css";

const sections = [
  {
    title: "Our Mission",
    description:
      "Cyber-Infotech Learning Platform is dedicated to providing high-quality online education in cybersecurity, AI, web development, and data science. Our goal is to empower learners worldwide to achieve professional excellence.",
    image: "/section1.jpeg",
  },
  {
    title: "Cutting-Edge Courses",
    description:
      "We offer carefully curated courses designed by industry experts. Our interactive content, practical exercises, and real-world projects ensure learners gain hands-on experience and skills that employers demand.",
    image: "/section2.jpeg",
  },
  {
    title: "Personalized Learning",
    description:
      "Our platform tracks progress, recommends relevant courses, and allows learners to follow their own pace. Personalized dashboards help students stay motivated and achieve their learning goals effectively.",
    image: "/section3.jpeg",
  },
  {
    title: "Why Choose Us",
    description:
      "Unlike other platforms, we focus on premium quality content, industry-led instructors, and interactive learning. Our courses are designed to bridge the gap between theory and practical application.",
    image: "/section4.jpeg",
  },
];

const About = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".about-text");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("slide-in");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // trigger animation if already in view
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="about-container">
      {sections.map((section, index) => (
        <div className={`about-section ${index % 2 === 0 ? "image-left" : "image-right" }`} key={index} >
          <div className="about-image">
            <img src={section.image} alt={section.title} />
          </div>
          <div className="about-text">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;