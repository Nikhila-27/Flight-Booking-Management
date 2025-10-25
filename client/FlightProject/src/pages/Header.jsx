import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <Navbar fixed="top" className="bg-info"  expand="lg" variant="white">
        <Container>
          <Navbar.Brand href="#home">
            <i className="fa-solid fa-plane fa-2xl" style={{color: "#f2eaeaff,"}}></i>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Flight Booker&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           </Navbar.Brand>
          <Link className="btn btn-light me-2" to="/login">
            Login
          </Link>
          <Link className="btn btn-warning" to="/register">
            Register
          </Link>
         
        </Container>
      </Navbar>
    </div>
  )
}

export default Header