import { Star } from "lucide-react";

function TestimonialCard({ name, text }) {
  return (
    <div className="testimonial-card">
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={17} fill="currentColor" />
        ))}
      </div>

      <p>"{text}"</p>

      <h4>— {name}</h4>
    </div>
  );
}

export default TestimonialCard;