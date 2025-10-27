
import React, { useEffect, useState } from "react";
import { commonApi } from "../Api/commonApi";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFlightForm, setShowFlightForm] = useState(false);
  const [flightForm, setFlightForm] = useState({
    flight_number: "",
    origin: "",
    destination: "",
    date: "",
    time: "",
    price: "",
    seats_available: "",
    image: null,
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Fetch pending users
  const fetchPending = async () => {
    setLoading(true);
    const data = await commonApi("http://127.0.0.1:8000/api/admin/users/","GET",null,token);
    if (Array.isArray(data)) setUsers(data.filter(u => !u.is_approved));
    else setError("Failed to fetch users.");
    setLoading(false);
  };

  // Fetch flights
  const fetchFlights = async () => {
    const data = await commonApi("http://127.0.0.1:8000/api/flights/","GET",null,token);
    if (Array.isArray(data)) setFlights(data);
    else setFlights([]);
  };

  // Approve user
  const approveUser = async (id) => {
    await commonApi(
      `http://127.0.0.1:8000/api/admin/users/${id}/approve/`,
      "POST",
      null,
      token
    );
    fetchPending();
  };

  // Add flight
  const addFlight = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("flight_number", flightForm.flight_number);
    formData.append("origin", flightForm.origin);
    formData.append("destination", flightForm.destination);
    formData.append("date", flightForm.date);
    formData.append("time", flightForm.time);
    formData.append("price", flightForm.price);
    formData.append("seats_available", flightForm.seats_available);
    if (flightForm.image) formData.append("image", flightForm.image);

    const data = await commonApi(
      "http://127.0.0.1:8000/api/flights/",
      "POST",
      formData,
      token,
      true
    );

    alert(JSON.stringify(data));
    setShowFlightForm(false);
    fetchFlights();
  };

  useEffect(() => {
    fetchPending();
    fetchFlights();
  }, []);

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;

  return (
    // <div style={{ padding: "20px" }}>
    <div style={{ padding: "20px", paddingTop: "100px", marginLeft: '250px', width: '70%', marginBottom: '100px' }}>

      {/* Logout Button */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h1>Admin Dashboard</h1>

      {/* Pending Users Table */}
      <h2>Pending Users</h2>
      {users.length === 0 ? (
        <p>No pending approvals 🎉</p>
      ) : (
        <div style={{ overflowX: "auto", marginBottom: "20px" }}>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => approveUser(u.id)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Flight Section */}
      {/* <h2 className="mt-4">Flights</h2> */}
      <button
        className="btn btn-primary mb-2"
        onClick={() => setShowFlightForm(!showFlightForm)}
      >
        {showFlightForm ? "Cancel" : "Add Flight"}
      </button>

      {showFlightForm && (
        <form onSubmit={addFlight} style={{ marginBottom: "20px" }}>
          <input placeholder="Flight Number" required onChange={e => setFlightForm({ ...flightForm, flight_number: e.target.value }) }/>
          <input placeholder="Origin" required onChange={e => setFlightForm({ ...flightForm, origin: e.target.value })} />
          <input placeholder="Destination" required onChange={e => setFlightForm({ ...flightForm, destination: e.target.value }) } />
          <input type="date" required onChange={e => setFlightForm({ ...flightForm, date: e.target.value })}  />
          <input type="time" required onChange={e => setFlightForm({ ...flightForm, time: e.target.value })}/>
          <input type="number" placeholder="Price" required onChange={e => setFlightForm({ ...flightForm, price: e.target.value })} />
          <input type="number" placeholder="Seats Available" required onChange={e => setFlightForm({ ...flightForm, seats_available: e.target.value })} />
          <input type="file" accept="image/*" onChange={e => setFlightForm({ ...flightForm, image: e.target.files[0] })} className="mt-2" />
          <button type="submit" className="btn btn-success mt-2">
            Add Flight
          </button>
        </form>
      )}

      {/* Flights Table */}
      <h3>All Flights</h3>
      {flights.length === 0 ? (
        <p>No flights available.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Flight Number</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price (₹)</th>
                <th>Seats</th>
              </tr>
            </thead>
            <tbody>
              {flights.map(f => (
                <tr key={f.id}>
                  <td>
                    <img
                      src={f.image || "https://via.placeholder.com/100x50"}
                      alt={f.flight_number}
                      style={{ width: "100px", height: "50px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{f.flight_number}</td>
                  <td>{f.origin}</td>
                  <td>{f.destination}</td>
                  <td>{f.date}</td>
                  <td>{f.time}</td>
                  <td>{f.price}</td>
                  <td>{f.seats_available}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

