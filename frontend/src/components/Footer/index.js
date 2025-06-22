import { Card, Container, Row, Col } from "react-bootstrap";
import { ImLocation2 } from "react-icons/im";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaTwitter, FaFacebook, FaInstagram  } from "react-icons/fa";
import "./index.css"; 

const Footer = () => {
  return (
    <div className="footer-section">
      <Container>
        <Row>
          {/* Column 1 - Brand */}
          <Col md={3}>
            <Card className="footer-card">
              <Card.Body className="custom-card-body">
                <Card.Title className="card-title">
                  <h4>
                    <a href="#top"> Luxury Rides</a>
                  </h4>
                </Card.Title>
                <Card.Text className="desc">
                  Where elegance meets the road, experience unforgettable journeys with our exclusive selection of premium cars and motorbikes.
                </Card.Text>
                <div className="social-icons">
                  <FaTwitter />
                  <FaFacebook />
                  <FaInstagram />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Column 2 - Contact Info */}
          <Col md={3}>
            <Card className="footer-card">
              <Card.Body className="custom-card-body">
                <Card.Title className="card-title">
                  <h3>Opening Hours</h3>
                </Card.Title>
                <Card.Text className="desc">
                  <p>Monday - Friday:</p>
                  <p>09.00 AM - 09.00 PM</p><br></br>
                  <p>Saturday - Sunday:</p>
                  <p>09.00 AM - 12.00 PM</p>
                  </Card.Text>
                
              </Card.Body>
            </Card>
          </Col>

          {/* Column 3 - Contact Details */}
          <Col md={3}>
            <Card className="footer-card">
              <Card.Body className="custom-card-body">
                <Card.Title className="card-title">
                  <h3>Customer Support</h3>
                </Card.Title>
                <Card.Text className="desc">
                  <p>FAQ</p>
                  <p>Payment Option</p>
                  <p>Booking Tips</p>
                  <p>How it works</p>
                  <p>Contact Us</p>
                  </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Column 4 - Contact Details */}
          <Col md={3}>
            <Card className="footer-card">
              <Card.Body className="custom-card-body">
                <Card.Title className="card-title">
                  <h3>Have a Questions?</h3>
                </Card.Title>
                <Card.Text className="desc">
                  <p><ImLocation2/> 45 Abdyl Frashëri St., Blloku, Tirana, Albania</p>
                  <p><FaPhone/> + 2 392 3929 210</p>
                  <p><MdEmail/> luxuryrides@gmail.com</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Copyright */}
        <Row>
          <Col className="copyright-text">
            <p>Copyright ©2025 All rights reserved  </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
