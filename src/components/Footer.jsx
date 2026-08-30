import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Brand */}
        <div className="footer-section">
          <h2>ServiceHub</h2>
          <p>
            Find trusted professionals and book quality services
            easily and securely.
          </p>
        </div>

        <div className="footer-section">
          <h4>Platform</h4>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <a href="/#how-it-works">How It Works</a>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <a href="/#provider">Become a Provider</a>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <Link to="/help">Help Center</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms</Link>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 ServiceHub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;