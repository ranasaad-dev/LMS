import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Master Cybersecurity, AI, and Modern Technology Skills</h1>
        <p>
          Learn in-demand tech skills with hands-on projects, expert-led courses, and
          real-world labs designed to prepare you for modern digital challenges.
        </p>
        <Link to="/courses" ><button className="hero-cta">Explore Courses</button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;