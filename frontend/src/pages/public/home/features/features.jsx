import React from "react";
import "./features.css";

const features = [
  {
    title: "Expert-Led Courses",
    description:
      "Learn from industry professionals with real-world experience in cybersecurity, AI, and modern software development.",
  },
  {
    title: "Hands-On Projects",
    description:
      "Build practical skills through real projects, labs, and guided exercises.",
  },
  {
    title: "Career-Focused Learning",
    description:
      "Our curriculum focuses on the technologies and tools used by top tech companies.",
  },
  {
    title: "Flexible Learning",
    description:
      "Study anytime, anywhere with structured modules and self-paced lessons.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="features-section">
      <h2 className="features-title">Why Learn With Us</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h4>{feature.title}</h4>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;