import { Link } from "react-router-dom";
import { MapPin, Menu } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <MapPin size={24} />
        <span>ServiceHub</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <a href="/#how-it-works">How It Works</a>
        <a href="/#provider">Become a Provider</a>
      </div>

      <div className="nav-buttons">
        <Link to="/login" className="login-btn">
          Log in
        </Link>

        <Link to="/register" className="signup-btn">
          Sign Up
        </Link>
      </div>

      <button className="mobile-menu">
        <Menu size={25} />
      </button>
    </nav>
  );
}

export default Navbar;