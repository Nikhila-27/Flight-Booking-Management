import React from 'react'
import './bootstrap.min.css'
import Header from './pages/Header'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Footer from './pages/Footer'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import FlightSearch from './pages/Flightsearch'
import FlightList from './pages/FlightList'
import BookFlight from './pages/BookFlight'
import MyTrips from './pages/MyTrips'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />      
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/flights/list" element={<FlightList />} />
        <Route path="/book/:flightId" element={<BookFlight />} />
        <Route path="/mytrips" element={<MyTrips />} />

      
      </Routes>
      <Footer />
    </BrowserRouter>
    
  )
}

export default App