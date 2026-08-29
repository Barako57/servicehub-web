import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  CalendarDays,
  Clock,
  CheckCircle,
  LogOut,
  User,
  MapPin,
} from "lucide-react";

import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] =
    useState(true);

  useEffect(() => {
    async function loadBookings() {
      if (!user) {
        setBookings([]);
        setLoadingBookings(false);
        return;
      }

      try {
        const bookingsQuery = query(
          collection(db, "bookings"),
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(bookingsQuery);

        const bookingList = snapshot.docs.map(
          (document) => ({
            id: document.id,
            ...document.data(),
          })
        );

        setBookings(bookingList);
      } catch (error) {
        console.error(
          "Error loading bookings:",
          error
        );
      } finally {
        setLoadingBookings(false);
      }
    }

    loadBookings();
  }, [user]);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const totalBookings = bookings.length;

  const completedBookings = bookings.filter(
    (booking) =>
      booking.status === "Completed"
  ).length;

  const upcomingBookings = bookings.filter(
    (booking) =>
      booking.status !== "Completed"
  ).length;

  return (
    <section className="dashboard">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>
          <p>MY ACCOUNT</p>

          <h1>
            Welcome back 
          </h1>

          <span>
            Manage your ServiceHub bookings here.
          </span>
        </div>

        <div className="dashboard-actions">

          <Link
            to="/services"
            className="book-btn"
          >
            Book a Service
          </Link>

          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

      </div>


      {/* USER */}

      <div className="dashboard-user">

        <div className="user-icon">
          <User size={24} />
        </div>

        <div>
          <span>Logged in as</span>

          <strong>
            {user?.email}
          </strong>
        </div>

      </div>


      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-card">
          <CalendarDays />

          <span>
            Total Bookings
          </span>

          <strong>
            {totalBookings}
          </strong>
        </div>


        <div className="stat-card">
          <Clock />

          <span>
            Upcoming
          </span>

          <strong>
            {upcomingBookings}
          </strong>
        </div>


        <div className="stat-card">
          <CheckCircle />

          <span>
            Completed
          </span>

          <strong>
            {completedBookings}
          </strong>
        </div>

      </div>


      {/* BOOKINGS */}

      <div className="dashboard-card">

        <div className="dashboard-card-header">

          <div>
            <h2>
              My Bookings
            </h2>

            <p>
              Your actual ServiceHub bookings.
            </p>
          </div>

          <Link to="/services">
            Book another
          </Link>

        </div>


        {loadingBookings ? (
          <div className="booking-empty">
            <p>
              Loading your bookings...
            </p>
          </div>
        ) : bookings.length === 0 ? (

          <div className="booking-empty">

            <CalendarDays size={35} />

            <h3>
              No bookings yet
            </h3>

            <p>
              You haven't booked a service yet.
            </p>

            <Link
              to="/services"
              className="book-btn"
            >
              Find a Service
            </Link>

          </div>

        ) : (

          bookings.map((booking) => (

            <div
              className="booking-row"
              key={booking.id}
            >

              <div className="booking-details">

                <div className="booking-icon">
                  <CalendarDays size={20} />
                </div>

                <div>

                  <strong>
                    {booking.serviceTitle}
                  </strong>

                  <p>
                    {booking.provider}
                  </p>

                  <small>
                    <MapPin size={13} />
                    {booking.location}
                  </small>

                  <small>
                    Date: {booking.date} •{" "}
                    {booking.time}
                  </small>

                </div>

              </div>

              <span
                className={
                  booking.status === "Completed"
                    ? "status completed"
                    : "status"
                }
              >
                {booking.status}
              </span>

            </div>

          ))

        )}

      </div>


      {/* CTA */}

      <div className="dashboard-cta">

        <h2>
          Need another service?
        </h2>

        <p>
          Find a trusted professional and book your
          next service in just a few clicks.
        </p>

        <Link
          to="/services"
          className="book-btn"
        >
          Explore Services
        </Link>

      </div>

    </section>
  );
}

export default Dashboard;