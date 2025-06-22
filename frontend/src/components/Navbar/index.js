// src/components/NavbarOnly.js
import React, { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import "./index.css";
import { FaSearch } from "react-icons/fa";
import { GiCarKey } from "react-icons/gi";

const CustomNavbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // 🔸 State for showing the search box
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Navbar expand="xxl" className="navigation-bar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="logo-name">
          Luxury <strong>Rides</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-xxl" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-xxl"
          aria-labelledby="offcanvasNavbarLabel-expand-xxl"
          placement="end"
          className="mobile-nav"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-xxl" className="mobile-menu-title">
              Luxury<strong>Rides</strong>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="navbar-menu nav-gap nav-custom-style">
              <Nav.Link as={Link} to="/" className={`text-white ${isActive("/") ? "active-link" : ""}`}>Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className={`text-white ${isActive("/about") ? "active-link" : ""}`}>About</Nav.Link>
              <Nav.Link as={Link} to="/our-vehicles" className={`text-white ${isActive("/our-vehicles") ? "active-link" : ""}`}>Our vehicles</Nav.Link>
              <Nav.Link as={Link} to="/locations" className={`text-white ${isActive("/locations") ? "active-link" : ""}`}>Locations</Nav.Link>
              <Nav.Link as={Link} to="/contact" className={`text-white ${isActive("/contact") ? "active-link" : ""}`}>Contact</Nav.Link>

              {/* 🔸 Search Icon with toggle functionality */}
              <Nav.Link
                onClick={() => setShowSearch(!showSearch)}
                className="text-white search-icon"
                style={{ cursor: "pointer" }}
              >
                <FaSearch />
              </Nav.Link>

              <Nav.Link as={Link} to="/booking" className={`text-white ${isActive("/booking") ? "active-link" : ""}`}>
                <GiCarKey />
              </Nav.Link>
            </Nav>

            {/* 🔸 Search Box appears here if toggled */}
            {showSearch && (
              <div className="search-box-container mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
