import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { commonApi } from "../Api/commonApi";

function BookFlight() {
  const { flightId } = useParams(); 
  const [flight, setFlight] = useState(null);
  const [seats, setSeats] = useState(1);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const fetchFlight = async () => {
    const data = await commonApi(
      `http://127.0.0.1:8000/api/flights/${flightId}/`,
      "GET",
      null,
      token
    );
    setFlight(data);
  };

  useEffect(() => {
    fetchFlight();
  }, [flightId]);

  
const handleBooking = async () => {
  if (!flight) return;

  const bookingData = {
    flight_id: flight.id,
    seats: seats,
};

  const data = await commonApi(
    "http://127.0.0.1:8000/api/bookings/",
    "POST",
    bookingData,
    token,
    false 
  );

  if (data.id) {
    alert("Booking successful!");
    navigate("/mytrips"); 
  } else {
    console.error("Booking failed:", data);
    alert(`Booking failed: ${JSON.stringify(data)}`);
  }
};


  if (!flight) return <p>Loading flight details...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Book Flight: {flight.flight_number}</h2>
      <p>
        {flight.origin} → {flight.destination}
      </p>
      <p>Date: {flight.date}</p>
      <p>Time: {flight.time}</p>
      <p>Price per seat: ₹{flight.price}</p>
      <p>Seats available: {flight.seats_available}</p>

      <label>
        Number of seats:
        <input
          type="number"
          min="1"
          max={flight.seats_available}
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="form-control my-2"
        />
      </label>

      <button onClick={handleBooking} className="btn btn-primary w-100">
        Confirm Booking
      </button>
    </div>
  );
}

export default BookFlight;
