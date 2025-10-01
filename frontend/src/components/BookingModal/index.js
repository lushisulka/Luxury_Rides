import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useCarContext } from "../../context/CarContext";
import { useBookingContext } from "../../context/BookingContext";
import "./index.css";

const BookingModal = ({ show, handleClose, carId, userId }) => {
    const { triggerCar, setTriggerCar } = useCarContext();
    const { createBooking } = useBookingContext();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!startDate || !endDate) {
            alert("Please select both dates");
            return;
        }
        const result = await createBooking({ user_id: userId.id, vehicle_id: parseInt(carId), startDate: startDate, endDate: endDate, confirmed: false });
        console.log("result---", result);
        if (result.status === 200) {
            setMessage("Vehicle created successfully")
            setTriggerCar(!triggerCar);
            setStartDate("");
            setEndDate("");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Booking</Modal.Title>
                {
                    message.length > 0
                        ?
                        <Alert variant='success'>
                            {message}
                        </Alert>
                        : ""
                }
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Book this car
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BookingModal;