import React from "react";
import "./HowItWorks.css";

const steps = [
  {
    title: "Choose Your Path",
    description:
      "Browse our courses and select a learning path that fits your career goals.",
  },
  {
    title: "Learn with Interactive Lessons",
    description:
      "Watch lectures, read guides, and practice with hands-on exercises.",
  },
  {
    title: "Build Real Projects",
    description:
      "Apply your knowledge by completing practical projects and labs.",
  },
  {
    title: "Earn Certificates",
    description:
      "Showcase your skills with certificates after completing courses.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-work" className="how-it-works-section">
      <h2>How Our Learning System Works</h2>
      <div className="work-steps">
        {steps.map((step, index) => (
          <div key={index} className="work-card">
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;