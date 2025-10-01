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

    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    return (
        <>
            <CustomNavbar />

            <Container className="my-5 vehicle-details-container">
                <h2 className="mb-4 title text-center">{car.brand} {car.model} ({car.year})</h2>

                <Row className="g-4 align-items-center">
                    {/* Carousel for images */}
                    <Col md={6} sm={12}>
                        <Carousel variant="dark">
                            {car.images?.map((img, i) => (
                                <Carousel.Item key={i}>
                                    <img
                                        className="d-block w-100 vehicle-image"
                                        src={`http://localhost:3000/vehicles/uploads/${img}`}
                                        alt={`${car.brand} ${car.model} ${i}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>

                    {/* Specifications */}
                    <Col md={6} sm={12}>
                        <Card className="p-4 shadow-sm specs-card">
                            <h5 className="mb-3">Specifications</h5>
                            <p><strong>Brand:</strong> {car.brand}</p>
                            <p><strong>Model:</strong> {car.model}</p>
                            <p><strong>Year:</strong> {car.year}</p>
                            <p><strong>Color:</strong> {car.color}</p>
                            <p><strong>Engine:</strong> {car.engine} HP</p>
                            <p><strong>Fuel:</strong> {car.fuel}</p>
                            <p><strong>Transmission:</strong> {car.transmission ? "Automatic" : "Manual"}</p>
                            <p><strong>Availability:</strong> {car.available ? "Available" : "Not Available"}</p>
                            <p><strong>Price per Day:</strong> {car.price} €</p>

                            {authUser.id
                                ? <Button className="btn-gradient w-100 mt-3" onClick={handleOpen}>Book This Car</Button>
                                : <Button className="btn-gradient w-100 mt-3" onClick={handleLogin}>You need to be loged in</Button>
                            }
                        </Card>
                    </Col>
                </Row>
                <BookingModal show={open} handleClose={handleClose} carId={id} userId={authUser} />
            </Container>
            <Footer />
        </>
    );
};

export default VehicleDetails;
