import { useEffect } from "react";
import "./CallToAction.css";
import { Link } from "react-router-dom";

const CallToAction = () => {
 
  return (
    <section className="call-to-action-section">
    
      <div className="call-to-action-content">
        <h3>Start Your Tech Learning Journey Today</h3>
        <p>
          Join our learning platform and develop the skills needed for the future of technology.
        </p>
        <div className="cta-buttons">
         
          <Link to="/courses"><button className="cta-btn primary">Browse Courses</button></Link>
          <Link to="/register"><button className="cta-btn secondary">Create Free Account</button></Link>
          
        </div>
      </div>
    </section>
  );
};

export default CallToAction;