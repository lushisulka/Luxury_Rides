import { useState } from 'react';
import { useCarContext } from '../../context/CarContext';
import CustomNavbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Container, Row, Col, Card, Button, Form, Nav } from 'react-bootstrap';
import "./index.css";

const Vehicles = () => {
  const { bookedCars } = useCarContext();

  // State për filtrat
  const [brandFilter, setBrandFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [engineFilter, setEngineFilter] = useState('');
  const [transmissionFilter, setTransmissionFilter] = useState('');

  // Funksion për filtrim
  const filteredCars = bookedCars?.filter(car => {
    return (
      (brandFilter === '' || car.brand.toLowerCase().includes(brandFilter.toLowerCase())) &&
      (modelFilter === '' || car.model.toLowerCase().includes(modelFilter.toLowerCase())) &&
      (yearFilter === '' || car.year.toString().includes(yearFilter)) &&
      (engineFilter === '' || car.engine.toString().includes(engineFilter)) &&
      (transmissionFilter === '' ||
        (transmissionFilter === 'automatic' && car.transmission) ||
        (transmissionFilter === 'manual' && !car.transmission))
    );
  });

  return (
    <>
      <div className="vehicles-background">
        <CustomNavbar />
        <div className="about-title text-center">
          <h1>Where elegance meets the road</h1>
          <p>At LUXURY RIDES, we believe that every journey deserves style, comfort, <br />
            and a touch of sophistication. From premium cars to unforgettable experiences, we’re here to redefine the way you travel.</p>
        </div>
      </div>

      <Container className="vehicles-container my-5">
        <h2 className="mb-4 vehicle-content text-center">Find Your Perfect Ride</h2>

        {/* Filters */}
        <Row className="mb-4 g-3">
          <Col md={3} sm={6}>
            <Form.Control
              placeholder="Brand"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
            />
          </Col>
          <Col md={3} sm={6}>
            <Form.Control
              placeholder="Model"
              value={modelFilter}
              onChange={(e) => setModelFilter(e.target.value)}
            />
          </Col>
          <Col md={2} sm={6}>
            <Form.Control
              placeholder="Year"
              type="number"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            />
          </Col>
          <Col md={2} sm={6}>
            <Form.Control
              placeholder="Engine (HP)"
              type="number"
              value={engineFilter}
              onChange={(e) => setEngineFilter(e.target.value)}
            />
          </Col>
          <Col md={2} sm={6}>
            <Form.Select value={transmissionFilter} onChange={(e) => setTransmissionFilter(e.target.value)}>
              <option value="">Transmission</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Cars Results */}
        <Row className="g-4">
          {filteredCars?.length === 0 ? (
            <p className="text-center py-5">No vehicles match your filters.</p>
          ) : (
            filteredCars.map(car => (
              <Col md={4} sm={12} key={car.id}>
                <Card className="vehicle-card hover-zoom">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:3000/vehicles/uploads/${car.images[0]}`}
                    className="vehicle-img"
                  />
                  <Card.Body>
                    <Card.Title>{car.brand} {car.model} ({car.year})</Card.Title>
                    <Card.Text>
                      Engine: {car.engine} HP <br />
                      Transmission: {car.transmission ? "Automatic" : "Manual"} <br />
                      Availability: {car.available ? "Available" : "Not Available"} <br />
                      Price per Day: {car.price} €
                    </Card.Text>
                    <Button className="btn-gradient w-100">
                      <Nav.Link href={`vehicle/${car.id}`} className="text-white text-decoration-none">Explore Car</Nav.Link>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default Vehicles;
