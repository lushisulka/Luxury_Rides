import { Carousel, Container, Row, Col, Button, Card } from "react-bootstrap";
import carOne from "../../images/car-1.jpg";
import carTwo from "../../images/car-3.jpg";
import carThree from "../../images/car-10.jpg";
import carfour from "../../images/bg_1.jpg";
import carfive from "../../images/lambo.jpeg";
import saloncar from "../../images/salon.png";
import "./index.css";

const BodyHome = () => {

  return (
    <>
      <div className="home-main-wrapper">
        <Container className="body-home my-5">
          <div className="carousel-title text-center mb-4">
            <h2>Featured Vehicles</h2>
          </div>
          <Row>
            <Col sm={12} md={12} className="mx-auto">
              <Carousel className="vehicle-carousel">

                <Carousel.Item>
                  <Row className="justify-content-center">
                    <Col md={4} sm={12} className="mb-4">
                      <Card className="vehicle-card">
                        <Card.Img variant="top" src={carOne} />
                        <Card.Body>
                          <Card.Title>{"car.title"}</Card.Title>
                          <Card.Text className="text-muted">{"car.brand"}</Card.Text>
                          <Card.Text>
                            <span className="price">{"car.price"}</span>
                            <span className="text-muted"> /day</span>
                          </Card.Text>
                          <div className="d-flex gap-2">
                            <Button variant="primary" className="w-50">Book now</Button>
                            <Button variant="success" className="w-50">Details</Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col md={4} sm={12} className="mb-4">
                      <Card className="vehicle-card">
                        <Card.Img variant="top" src={carTwo} />
                        <Card.Body>
                          <Card.Title>{"car.title"}</Card.Title>
                          <Card.Text className="text-muted">{"car.brand"}</Card.Text>
                          <Card.Text>
                            <span className="price">{"car.price"}</span>
                            <span className="text-muted"> /day</span>
                          </Card.Text>
                          <div className="d-flex gap-2">
                            <Button variant="primary" className="w-50">Book now</Button>
                            <Button variant="success" className="w-50">Details</Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>


                    <Col md={4} sm={12} className="mb-4">
                      <Card className="vehicle-card">
                        <Card.Img variant="top" src={carThree} />
                        <Card.Body>
                          <Card.Title>{"car.title"}</Card.Title>
                          <Card.Text className="text-muted">{"car.brand"}</Card.Text>
                          <Card.Text>
                            <span className="price">{"car.price"}</span>
                            <span className="text-muted"> /day</span>
                          </Card.Text>
                          <div className="d-flex gap-2">
                            <Button variant="primary" className="w-50">Book now</Button>
                            <Button variant="success" className="w-50">Details</Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Carousel.Item>

                <Carousel.Item>
                  <Row className="justify-content-center">
                    <Col md={4} sm={12} className="mb-4">
                      <Card className="vehicle-card">
                        <Card.Img variant="top" src={carfour} />
                        <Card.Body>
                          <Card.Title>{"car.title"}</Card.Title>
                          <Card.Text className="text-muted">{"car.brand"}</Card.Text>
                          <Card.Text>
                            <span className="price">{"car.price"}</span>
                            <span className="text-muted"> /day</span>
                          </Card.Text>
                          <div className="d-flex gap-2">
                            <Button variant="primary" className="w-50">Book now</Button>
                            <Button variant="success" className="w-50">Details</Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col md={4} sm={12} className="mb-4">
                      <Card className="vehicle-card">
                        <Card.Img variant="top" src={carfive} />
                        <Card.Body>
                          <Card.Title>{"car.title"}</Card.Title>
                          <Card.Text className="text-muted">{"car.brand"}</Card.Text>
                          <Card.Text>
                            <span className="price">{"car.price"}</span>
                            <span className="text-muted"> /day</span>
                          </Card.Text>
                          <div className="d-flex gap-2">
                            <Button variant="primary" className="w-50">Book now</Button>
                            <Button variant="success" className="w-50">Details</Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>


                    <Col md={4} sm={12} className="mb-4">
                      <Card className="vehicle-card">
                        <Card.Img variant="top" src={carThree} />
                        <Card.Body>
                          <Card.Title>{"car.title"}</Card.Title>
                          <Card.Text className="text-muted">{"car.brand"}</Card.Text>
                          <Card.Text>
                            <span className="price">{"car.price"}</span>
                            <span className="text-muted"> /day</span>
                          </Card.Text>
                          <div className="d-flex gap-2">
                            <Button variant="primary" className="w-50">Book now</Button>
                            <Button variant="success" className="w-50">Details</Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Carousel.Item>

              </Carousel>
            </Col>
          </Row>
        </Container>
      </div >

      {/* About Section */}
      <section className="about-section my-5">
        <div className="about-container">
          <div className="about-image">
            {/* the import of an image */}
            <img src={`${saloncar}`} alt="information"/>
          </div>
          <div className="about-text">
            <h5 className="section-subtitle">ABOUT US</h5>
            <h2 className="section-title">Welcome to Carbook</h2>
            <p>
              A small river named Duden flows by their place and supplies it with
              the necessary regelialia. It is a paradisematic country, in which
              roasted parts of sentences fly into your mouth.
            </p>
            <p>
              On her way she met a copy. The copy warned the Little Blind Text,
              that where it came from it would have been rewritten a thousand
              times and everything that was left from its origin would be the
              word "and" and the Little Blind Text should turn around and return
              to its own, safe country.
            </p>
            <button className="about-btn">Search Vehicle</button>
          </div>
        </div>
      </section>

    </>
  );
};

export default BodyHome;