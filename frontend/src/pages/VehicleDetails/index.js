import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from "../../context/AuthContext";
import { useCarContext } from '../../context/CarContext';

import CustomNavbar from '../../components/Navbar';
import BookingModal from '../../components/BookingModal';
import Footer from '../../components/Footer';

import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';

import './index.css';

const VehicleDetails = () => {
    const { id } = useParams();

    const { authUser } = useAuthContext();
    const { getCarById } = useCarContext();

    const [car, setCar] = useState({ images: [] });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchCarById = async () => {
            try {
                const result = await getCarById(id);

                if (result.status === 200) {
                    setCar(result.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchCarById();
    }, [id, getCarById]);

    const handleLogin = () => {
        // Vendos këtu logjikën e hapjes së Login modal nëse nevojitet.
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <CustomNavbar />

            <Container className="vehicle-details-container">

                {/* Vehicle heading */}
                <div className="vehicle-details-heading">
                    <h2>
                        {car.brand} {car.model}
                    </h2>

                    <span>{car.year}</span>
                </div>

                <Row className="g-4 vehicle-content-row">

    {/* Vehicle images */}
    <Col lg={6} md={6} xs={12} className="vehicle-column">
        <div className="vehicle-gallery">

            {car.images?.length > 0 ? (
                <Carousel variant="dark">
                    {car.images.map((img, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="vehicle-image"
                                src={`http://localhost:3000/vehicles/uploads/${img}`}
                                alt={`${car.brand} ${car.model}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <div className="vehicle-no-image">
                    No image available
                </div>
            )}

        </div>
    </Col>

    {/* Vehicle specifications */}
    <Col lg={6} md={6} xs={12} className="vehicle-column">
        <Card className="specs-card">
            <Card.Body>

                <h5>Vehicle Specifications</h5>

                <div className="specs-list">

                    <div className="spec-row">
                        <div className="spec-item">
                            <span>Brand</span>
                            <strong>{car.brand || '-'}</strong>
                        </div>

                        <div className="spec-item">
                            <span>Model</span>
                            <strong>{car.model || '-'}</strong>
                        </div>

                        <div className="spec-item">
                            <span>Year</span>
                            <strong>{car.year || '-'}</strong>
                        </div>
                    </div>

                    <div className="spec-row">
                        <div className="spec-item">
                            <span>Color</span>
                            <strong>{car.color || '-'}</strong>
                        </div>

                        <div className="spec-item">
                            <span>Engine</span>
                            <strong>{car.engine ? `${car.engine} HP` : '-'}</strong>
                        </div>

                        <div className="spec-item">
                            <span>Fuel</span>
                            <strong>{car.fuel || '-'}</strong>
                        </div>
                    </div>

                    <div className="spec-row">
                        <div className="spec-item">
                            <span>Transmission</span>
                            <strong>
                                {car.transmission ? 'Automatic' : 'Manual'}
                            </strong>
                        </div>

                        <div className="spec-item">
                            <span>Availability</span>
                            <strong className={car.available ? 'available' : 'unavailable'}>
                                {car.available ? 'Available' : 'Not Available'}
                            </strong>
                        </div>

                        <div className="spec-item"></div>
                    </div>

                </div>

                <div className="vehicle-price">
                    <span>Price per day</span>
                    <strong>{car.price} €</strong>
                </div>

                {authUser?.id ? (
                    <Button
                        className="vehicle-book-button"
                        onClick={handleOpen}
                        disabled={!car.available}
                    >
                        {car.available ? 'Book This Car' : 'Not Available'}
                    </Button>
                ) : (
                    <Button
                        className="vehicle-book-button"
                        onClick={handleLogin}
                    >
                        Log in to book
                    </Button>
                )}

            </Card.Body>
        </Card>
    </Col>

</Row>

                {/* Booking modal */}
                <BookingModal
                    show={open}
                    handleClose={handleClose}
                    carId={id}
                    userId={authUser}
                />

            </Container>

            <Footer />
        </>
    );
};

export default VehicleDetails;
