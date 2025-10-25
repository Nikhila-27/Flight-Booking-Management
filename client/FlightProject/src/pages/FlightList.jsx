import React, { useEffect, useState } from "react";
import { commonApi } from "../Api/commonApi";
import { useNavigate } from "react-router-dom";

function FlightList() {
  const [flights, setFlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchFlights = async () => {
    const data = await commonApi(
      "http://127.0.0.1:8000/api/flights/",
      "GET",
      null,
      token
    );

    if (Array.isArray(data)) {
      setFlights(data);
    } else {
      setFlights([]);
      alert("Failed to fetch flights");
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);


  const handleBook = (flightId) => {
    navigate(`/book/${flightId}`);
  };


  const filteredFlights = flights.filter((f) =>
    f.flight_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", marginTop: "80px", marginBottom: "40px" }}>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by flight, origin or destination"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #d6c9c9ff",
            backgroundColor: "white",
            boxSizing: "border-box",

          }}
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredFlights.length === 0 && <p>No flights available.</p>}

        {filteredFlights.map((f) => (
          <div
            key={f.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              width: "300px",
              padding: "15px",
              boxShadow: "0 2px 5px rgba(255, 254, 254, 0.9)"
            }}
          >
            <img
              src={f.image || "https://via.placeholder.com/300x150"}
              alt={f.flight_number}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3 style={{ margin: "10px 0 5px" }}>{f.flight_number}</h3>
            <p>{f.origin} → {f.destination}</p>
            <p>Date: {f.date}</p>
            <p>Time: {f.time}</p>
            <p>Price: ₹{f.price}</p>
            <p>Status: {f.status}</p>
            <button
              onClick={() => handleBook(f.id)}
              className="btn btn-success w-100"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlightList;
