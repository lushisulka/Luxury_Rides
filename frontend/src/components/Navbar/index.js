// src/components/NavbarOnly.js
import { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Login from '../Modal/Login';
import Register from '../Modal/Register';
import { useAuthContext } from "../../context/AuthContext";
import "./index.css";

const CustomNavbar = () => {
  const { authUser, logout, showLogin, setShowLogin } = useAuthContext();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [showRegister, setShowRegister] = useState(false);


  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const handleLogout = async () => {
    await logout();
  };

  // merr inicialet e user-it (p.sh. "Lushi Kola" -> "LK")
  const getInitials = (firstname, lastname) => {
    if (!firstname && !lastname) return "";
    const first = firstname ? firstname.charAt(0).toUpperCase() : "";
    const last = lastname ? lastname.charAt(0).toUpperCase() : "";
    return first + last;
  };

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

              {authUser?.id ? (
                <>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  {authUser.roles === "admin" ? (
                    <Nav.Link as={Link} to="/admin-vehicles" className="text-white">
                      Admin
                    </Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to="/profiles" className="text-white auth-user">
                      {getInitials(authUser.firstname, authUser.lastname)}
                    </Nav.Link>
                  )}
                </>
              ) : (
                <>
                    <Nav.Link
                      className={`text-white ${isActive("/login") ? "active-link" : ""}`}
                      onClick={() => setShowLogin(true)}
                    >
                      Login
                    </Nav.Link>
                  <Nav.Link className={`text-white ${isActive("/register") ? "active-link" : ""}`} onClick={handleShowRegister}>Register</Nav.Link>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>

      <Login show={showLogin} close={() => setShowLogin(false)} />
      <Register show={showRegister} close={handleCloseRegister} />
    </Navbar>
  );
};

export default CustomNavbar;
