import { Link } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  Clock,
  BadgeCheck,
} from "lucide-react";

import ServiceCard from "../components/ServiceCard";
import TestimonialCard from "../components/TestimonialCard";
import { services } from "../data/services";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="badge">Trusted local services</p>

          <h1>
            Find trusted <span>services</span> near you
          </h1>

          <p className="hero-text">
            Book reliable professionals for your everyday needs.
            Quick, easy and secure.
          </p>

          <div className="search-box">
            <Search size={21} />

            <input
              type="text"
              placeholder="What service do you need?"
            />

            <Link to="/services">Search</Link>
          </div>

          <div className="trust-row">
            <span>
              <ShieldCheck size={18} /> Trusted providers
            </span>

            <span>
              <BadgeCheck size={18} /> Verified services
            </span>

            <span>
              <Clock size={18} /> Easy booking
            </span>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-top">
            <span>Popular today</span>
            <span className="online">● Available</span>
          </div>

          <h3>Home Cleaning</h3>

          <p>Professional cleaning service</p>

          <div className="hero-price">
            <strong>KSh 1,500</strong>
            <span>from</span>
          </div>

          <Link to="/services/1">Book service →</Link>
        </div>
      </section>

      <section className="services-section">
        <div className="section-heading">
          <p>WHAT WE OFFER</p>
          <h2>Popular Services</h2>
          <span>
            Find trusted professionals for your everyday needs.
          </span>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="center-button">
          <Link to="/services" className="outline-btn">
            View all services
          </Link>
        </div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="section-heading">
          <p>HOW IT WORKS</p>
          <h2>Get your service in 3 easy steps</h2>
          <span>
            Finding the right professional has never been easier.
          </span>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Search</h3>
            <p>
              Search for the service you need and discover
              available professionals.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <h3>Choose</h3>
            <p>
              Compare prices, ratings and reviews to choose
              the right professional.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Book</h3>
            <p>
              Select your preferred date and time and book
              your service securely.
            </p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-heading">
          <p>CUSTOMER REVIEWS</p>
          <h2>What our customers say</h2>
          <span>
            Real experiences from people using ServiceHub.
          </span>
        </div>

        <div className="testimonials-grid">
          <TestimonialCard
            name="Amina Hassan"
            text="ServiceHub made it so easy to find a reliable plumber. I booked in just a few minutes!"
          />

          <TestimonialCard
            name="Brian Otieno"
            text="I love being able to compare different providers and prices before booking."
          />

          <TestimonialCard
            name="Mary Wanjiku"
            text="The booking process is simple and professional. I definitely recommend ServiceHub."
          />
        </div>
      </section>

      <section className="provider-section" id="provider">
        <div className="provider-content">
          <p className="provider-label">GROW YOUR BUSINESS</p>

          <h2>Are you a service professional?</h2>

          <p>
            Join ServiceHub and connect with customers looking
            for your services. Create your profile and receive
            bookings.
          </p>

          <Link to="/register" className="provider-btn">
            Become a Provider →
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;