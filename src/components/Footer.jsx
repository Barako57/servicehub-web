import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h2>ServiceHub</h2>
          <p>
            Find trusted professionals and book quality services
            easily and securely.
          </p>
        </div>

        <div>
          <h4>Platform</h4>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <a href="/#how-it-works">How It Works</a>
        </div>

        <div>
          <h4>Company</h4>
          <a href="/#provider">Become a Provider</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
        </div>

        <div>
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 ServiceHub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;