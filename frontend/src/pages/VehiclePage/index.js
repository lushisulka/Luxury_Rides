import { useEffect, useState } from "react";
import { useCarContext } from "../../context/CarContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import CustomNavbar from "../../components/Navbar";
import Footer from '../../components/Footer';
import Carousel from 'react-bootstrap/Carousel';

import "./index.css";

const VehiclePage = () => {
  const { getCarById } = useCarContext();
  const { id } = useParams();
  const [car, setCar] = useState({});

  useEffect(() => {
    loadCarById(id);
  }, [id]);


  const loadCarById = async (id) => {
    try {
      const result = await getCarById(id);
      if (result.status === 200) {
        setCar(result.data);
      }
    } catch (error) {
      console.error('Error fetching car by ID:', error);
    }
  }

  return (
    <>
      <div className="vehicle-body">
        <div className="vehicle-page-header">
          <CustomNavbar />
        </div>

        <div className="page-container">
          <Container>
            <Row>
              {/* Vehicle Data */}
              <Col xs={12} sm={5} md={4} className="vehicle-data">
                <div className="vehicle-data-inner">
                  <h4>$169 <span>/Per Day</span></h4>
                  <ul>
                    <li><span className="car-attribute">Brand</span> <span className="car-attr-response">{car.brand}</span></li>
                    <li><span className="car-attribute">Model</span> <span className="car-attr-response">{car.model}</span></li>
                    <li><span className="car-attribute">Year</span> <span className="car-attr-response">{car.year}</span></li>
                    <li><span className="car-attribute">Type</span> <span className="car-attr-response">{car.type}</span></li>
                    <li><span className="car-attribute">Transimision</span> <span className="car-attr-response">{car.transmission ? "Automatic" : "Manual"}</span></li>
                    <li><span className="car-attribute">Available</span> <span className="car-attr-response">{car.available ? "Available" : "Not Available"}</span></li>
                    <li><span className="car-attribute">Color</span> <span className="car-attr-response">{car.color}</span></li>
                    <li><span className="car-attribute">Description</span> <span className="car-attr-response">{car.description}</span></li>
                  </ul>
                  <Button variant="warning" className="book-button">Book Now</Button>
                </div>
              </Col>

              {/* Vehicle Carousel */}
              <Col xs={12} sm={7} md={7} className="vehicle-slider">
                <div className="luxury-carousel">
                  <Carousel className="vehicle-carousel">


                    {
                      car.images?.map((image, index) => {
                        return (
                          <Carousel.Item>
                            <Card className="vehicle-card">
                              <Card.Img variant="top" src={`http://localhost:3000/vehicles/uploads/${image}`} />
                            </Card>
                          </Carousel.Item>
                        )
                      })
                    }

                  </Carousel>
                </div>
              </Col>
            </Row>
          </Container>
        </div>


        <Footer />
      </div>
    </>
  );
};

export default VehiclePage;
