import { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";

function Services() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Cleaning",
    "Plumbing",
    "Electrical",
    "Technology",
    "Automotive",
    "Education",
  ];

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || service.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="services-page">
      <div className="page-header">
        <p>EXPLORE SERVICES</p>
        <h1>Find the right service for you</h1>
        <span>
          Browse trusted professionals and choose the service
          you need.
        </span>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="services-grid">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        ) : (
          <p className="no-results">
            No services found.
          </p>
        )}
      </div>
    </section>
  );
}

export default Services;