import React, { useState, useEffect } from "react";
import { commonApi } from "../Api/commonApi";
import { useNavigate } from "react-router-dom";

function MyTrips() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  const fetchBookings = async () => {
    const data = await commonApi(
      "http://127.0.0.1:8000/api/bookings/",
      "GET",
      null,
      token
    );
    console.log("Bookings API response:", data); 
    if (Array.isArray(data)) {
      setBookings(data);
    } else {
      alert("Failed to fetch bookings. Please login again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p>Loading your trips...</p>;

  return (
    <div style={{ padding: "20px", marginBottom: '100px', marginTop: '100px' }}>
    
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h2>My Trips</h2>
      {bookings.length === 0 ? (
        <p>You have no trips booked yet.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {bookings.map((b) => (
            <div
              key={b.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                width: "250px",
                boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
              }}
            >
              <h4>FlightNumber:{b.flight.flight_number}</h4>
              <p>
                {b.flight.origin} → {b.flight.destination}
              </p>
              <p>Date: {b.flight.date}</p>
              <p>Time: {b.flight.time}</p>
              <p>Seats: {b.seats}</p>
              <p>Payment Status: {b.payment_status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTrips;
