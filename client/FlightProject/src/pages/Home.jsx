import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay">
        <div className="home-content text-center text-white">
          <h1 className="fw-bold mb-3">Welcome to Flight Booking System</h1>
          <p className="lead mb-4">
            Book your flights easily and get real-time updates!
          </p>
          <Link to="/register" className="btn btn-outline-light btn-lg home-btn ms-3">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
