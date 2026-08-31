import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { services } from "../data/services";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

function Booking() {
  const { id } = useParams();
  const { user } = useAuth();

  const service = services.find(
    (item) => item.id === Number(id)
  );

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    date: "",
    time: "",
    message: "",
  });

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

  function handleChange(event) {
    const { id, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [id]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!user) {
      setError("Please log in before booking a service.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "bookings"), {
        userId: user.uid,

        serviceId: service.id,
        serviceTitle: service.title,
        provider: service.provider || "ServiceHub Provider",

        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        date: formData.date,
        time: formData.time,
        message: formData.message,

        price: service.price,
        status: "Upcoming",

        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error saving booking:", error);
      setError("Booking could not be saved. Please try again.");
    } finally {
      setLoading(false);
    }
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
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">
            Phone Number
          </label>

          <input
            id="phone"
            type="tel"
            placeholder="07XXXXXXXX"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="location">
            Service Location
          </label>

          <input
            id="location"
            type="text"
            placeholder="Where should the service be done?"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label htmlFor="date">
            Preferred Date
          </label>

          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label htmlFor="time">
            Preferred Time
          </label>

          <input
            id="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">
            Additional Information
          </label>

          <textarea
            id="message"
            placeholder="Message..."
            rows="4"
            value={formData.message}
            onChange={handleChange}
          />

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

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
            disabled={loading}
          >
            {loading
              ? "Saving Booking..."
              : "Confirm Booking"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Booking;