import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
        const snap = await getDocs(q);
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setBookings(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const total = bookings.length;
  const upcoming = bookings.filter(b => b.status === "pending").length;
  const completed = bookings.filter(b => b.status === "completed").length;

  if (loading) return <p style={{ padding: "30px" }}>Loading bookings...</p>;

  return (
    <div style={{ padding: "30px", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "12px" }}><p>Total Bookings</p><h2>{total}</h2></div>
        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "12px" }}><p>Upcoming</p><h2>{upcoming}</h2></div>
        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "12px" }}><p>Completed</p><h2>{completed}</h2></div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>My Bookings</h2>
        {bookings.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <p>No bookings yet</p>
            <p>You haven't booked a service yet</p>
            <Link to="/services" style={{ background: "black", color: "white", padding: "10px 20px", borderRadius: "8px", display: "inline-block", marginTop: "15px" }}>Find a Service</Link>
          </div>
        ) : (
          bookings.map(b => (
            <div key={b.id} style={{ border: "1px solid #ddd", padding: "15px", margin: "10px 0", borderRadius: "10px" }}>
              <h3>{b.serviceTitle}</h3>
              <p>{b.date} at {b.time} - {b.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;