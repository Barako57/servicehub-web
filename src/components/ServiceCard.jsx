import { Link } from "react-router-dom";
import {
  Sparkles,
  Wrench,
  Zap,
  Laptop,
  Car,
  GraduationCap,
  Star,
} from "lucide-react";

const icons = {
  Cleaning: Sparkles,
  Plumbing: Wrench,
  Electrical: Zap,
  Technology: Laptop,
  Automotive: Car,
  Education: GraduationCap,
};

function ServiceCard({ service }) {
  const Icon = icons[service.category] || Sparkles;

  return (
    <div className="service-card">
      <div className="service-icon">
        <Icon size={28} />
      </div>

      <div className="rating">
        <Star size={15} fill="currentColor" />
        {service.rating}
      </div>

      <h3>{service.title}</h3>

      <p>{service.description}</p>

      <div className="service-info">
        <span>From KSh {service.price}</span>
        <span>{service.location}</span>
      </div>

      <Link
        to={`/services/${service.id}`}
        className="view-service"
      >
        View service →
      </Link>
    </div>
  );
}

export default ServiceCard;