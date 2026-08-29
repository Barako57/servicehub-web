import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { services } from "../data/services";

function Booking() {
  const { id } = useParams();

  const service = services.find(
    (item) => item.id === Number(id)
  );

  const [submitted, setSubmitted] = useState(false);

  if (!service) {
    return (
      <section className="not-found">
        <h1>Service not found</h1>

        <Link to="/services" className="book-btn">
          Back to Services
        </Link>
      </section>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="success-page">
        <div>
          <div className="success-icon">✓</div>

          <h1>Booking Confirmed!</h1>

          <p>
            Your booking for{" "}
            <strong>{service.title}</strong> has been
            submitted successfully.
          </p>

          <div className="success-buttons">
            <Link
              to="/dashboard"
              className="book-btn"
            >
              Go to Dashboard
            </Link>

            <Link
              to="/services"
              className="outline-btn"
            >
              Browse More Services
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="booking-page">
      <div className="booking-container">

        <div className="booking-intro">
          <p className="details-category">
            BOOK SERVICE
          </p>

          <h1>{service.title}</h1>

          <p className="details-description">
            Fill in your details below to request this
            service.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="booking-form"
        >
          <label htmlFor="name">
            Full Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="phone">
            Phone Number
          </label>

          <input
            id="phone"
            type="tel"
            placeholder="07XXXXXXXX"
            required
          />

          <label htmlFor="location">
            Service Location
          </label>

          <input
            id="location"
            type="text"
            placeholder="Where should the service be done?"
            required
          />

          <label htmlFor="date">
            Preferred Date
          </label>

          <input
            id="date"
            type="date"
            required
          />

          <label htmlFor="time">
            Preferred Time
          </label>

          <input
            id="time"
            type="time"
            required
          />

          <label htmlFor="message">
            Additional Information
          </label>

          <textarea
            id="message"
            placeholder="messange..."
            rows="4"
          />

          <div className="booking-summary">
            <span>Service</span>

            <strong>{service.title}</strong>

            <span>Price</span>

            <strong>
              KSh {service.price}
            </strong>
          </div>

          <button
            type="submit"
            className="book-btn"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </section>
  );
}

export default Booking;