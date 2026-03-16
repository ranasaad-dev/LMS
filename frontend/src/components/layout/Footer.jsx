import {Link} from "react-router-dom";
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div>
        <p className="mb-0">
          © {new Date().getFullYear()} LMS Platform. All rights reserved.
        </p>
        <Link to="/about">About us</Link>
      </div>
    </footer>
  );
}

export default Footer;