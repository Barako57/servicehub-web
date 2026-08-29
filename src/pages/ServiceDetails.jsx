import {
  Link,
  useParams,
} from "react-router-dom";

import {
  Star,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { services } from "../data/services";

function ServiceDetails() {
  const { id } = useParams();

  const service = services.find(
    (item) => item.id === Number(id)
  );

  if (!service) {
    return (
      <section className="not-found">
        <h1>Service not found</h1>

        <Link
          to="/services"
          className="book-btn"
        >
          Back to Services
        </Link>
      </section>
    );
  }

  return (
    <section className="details-page">

      <div className="details-card">

        <div className="details-main">

          <p className="details-category">
            {service.category}
          </p>

          <h1>
            {service.title}
          </h1>

          <div className="details-rating">

            <Star
              size={18}
              fill="currentColor"
            />

            {service.rating}

            <span>
              Excellent rating
            </span>

          </div>

          <div className="details-location">

            <MapPin size={18} />

            {service.location}

          </div>

          <p className="details-description">
            {service.description}
          </p>

          <h3>
            About this service
          </h3>

          <p className="details-description">
            Our verified professionals provide
            quality services with transparent
            pricing and convenient scheduling.
          </p>

          <div className="verified">

            <ShieldCheck size={20} />

            Verified Service Provider

          </div>

        </div>

        <div className="booking-box">

          <span>
            Starting from
          </span>

          <h2>
            KSh {service.price}
          </h2>

          <p>
            Provider: {service.provider}
          </p>

          <Link
            to={`/booking/${service.id}`}
            className="book-btn"
          >
            Book This Service
          </Link>

        </div>

      </div>

    </section>
  );
}

export default ServiceDetails;