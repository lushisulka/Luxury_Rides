import { Container, Row, Col, Button, Card, Nav } from "react-bootstrap";
import { useCarContext } from "../../context/CarContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import AboutPhoto from "../../images/about-body.png";
import "./index.css";

const BodyHome = () => {
  const { featuredCars } = useCarContext();
  const { authUser } = useAuthContext();
  const navigate = useNavigate();


  //console.log("featuredCars----", featuredCars);

  return (
    <>
      <section className="body-page">
        <div className="home-main-wrapper">
          <Container className="body-home">
            <div className="carousel-title text-center mb-5">
              <h2>Featured Vehicles</h2>
              <p className="carousel-subtitle">Choose from our latest collection of cars</p>
            </div>
            <Row className="justify-content-center">
              {featuredCars?.length === 0 ? (
                <div className="text-center py-5">
                  <h5>No vehicles available</h5>
                </div>
              ) : (
                featuredCars.map((car, index) => (
                  <Col md={4} sm={12} className="mb-4" key={index}>
                    <Card className="vehicle-card hover-zoom">
                      <Card.Img
                        variant="top"
                        src={`http://localhost:3000/vehicles/uploads/${car.images[0]}`}
                        className="vehicle-img"
                      />
                      <Card.Body className="d-flex flex-column justify-content-between">
                        <div>
                          <Card.Title className="vehicle-title">
                            {car.brand} {car.model} ({car.year})
                          </Card.Title>
                          <Card.Text className="vehicle-specs">
                            {car.transmission ? "Automatic" : "Manual"} | {car.engine} HP
                          </Card.Text>
                          <Card.Text className={`availability ${car.available ? "available" : "unavailable"}`}>
                            {car.available ? "Available" : "Not Available"}
                          </Card.Text>
                        </div>
                        <Button className="w-100 mt-3" onClick={() => {
                          if (authUser?.id && car.available === true) {
                            navigate(`/vehicle/${car.id}`);
                          }
                        }}
                        >
                          {(authUser?.id && car.available === true) ? "Book Now"  : "Not available"}
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Container>
        </div>

        {/* About Section */}
        <section className="about-section my-5">
          <div className="about-container">
            <div className="about-image">
              <img src={AboutPhoto} alt="Salon" />
            </div>
            <div className="about-text">
              <h5 className="section-subtitle">ABOUT US</h5>
              <h2 className="section-title">Welcome to Carbook</h2>
              <p>
                Explore our premium cars, carefully selected to offer the best experience on the road. Quality, comfort, and style in every ride.
              </p>
              <p>
                Book a car today and enjoy a seamless rental experience with Carbook.
              </p>
              <Button className="about-btn">
                <Nav.Link href={`/our-vehicles`}>Search Vehicle</Nav.Link>
              </Button>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default BodyHome;
