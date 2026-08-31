import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";

function Services() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(urlSearch);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  const categories = [
    "All",
    "Cleaning",
    "Plumbing",
    "Electrical",
    "Technology",
    "Automotive",
    "Education",
  ];

  const filteredServices = services
    .filter((service) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        query === "" ||
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.location.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" ||
        service.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "price-low") {
        return a.price - b.price;
      }

      if (sort === "price-high") {
        return b.price - a.price;
      }

      if (sort === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (value.trim()) {
      setSearchParams({
        search: value.trim(),
      });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setSearch("");
    setCategory("All");
    setSort("default");
    setSearchParams({});
  };

  return (
    <section className="services-page">
      {/* HEADER */}
      <div className="page-header">
        <p>EXPLORE SERVICES</p>

        <h1>Find the right service for you</h1>

        <span>
          Browse trusted professionals and choose the service
          you need.
        </span>
      </div>

      {/* FILTERS */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={handleSearch}
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="default">
            Sort by
          </option>

          <option value="price-low">
            Price: Low to High
          </option>

          <option value="price-high">
            Price: High to Low
          </option>

          <option value="rating">
            Highest Rating
          </option>
        </select>
      </div>

      {/* RESULT COUNT */}
      <div className="results-info">
        <h2>
          {search
            ? `Results for "${search}"`
            : "All Services"}
        </h2>

        <span>
          {filteredServices.length} service
          {filteredServices.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* SERVICES */}
      <div className="services-grid">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))
        ) : (
          <div className="no-results">
            <h3>No services found</h3>

            <p>
              Try searching for cleaning, plumbing,
              electrical, technology, automotive or education.
            </p>

            <button
              onClick={clearSearch}
              className="outline-btn"
            >
              View all services
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;