import { useCarContext } from "../../../context/CarContext";
import { useBookingContext } from "../../../context/BookingContext";
import { Table, Container, Button, Navbar, Nav } from "react-bootstrap";

const BookedCars = () => {
    const { triggerCar, setTriggerCar } = useCarContext();
    const { booking, confirmBooking, removeBooking } = useBookingContext();

    const handleConfirm = async (id) => {
        try {
            return await confirmBooking(id);
        } catch (error) {
            console.log("error--on confirm--", error);
        }
    };

    const handleCancel = async (id) => {
        try {
            const result = await removeBooking(id);
            if (result.status === 200) {
                setTriggerCar(prev => !prev);
            }
        } catch (error) {
            console.log("error---on-- cancel");
        }
    };

    return (
        <>
            {/* NAV */}
            <Navbar expand="lg" className="nav-elevated">
                <Container>
                    <Navbar.Brand href="#home" className="brand-mark">
                        <span className="brand-dot" /> Admin Dashboard
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="no-border" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto gap-2">
                            <Nav.Link href="/admin-vehicles" className="nav-pill">
                                Vehicles
                            </Nav.Link>
                            <Nav.Link href="/booking" className="nav-pill active">
                                Booking
                            </Nav.Link>
                            <Nav.Link href="/" className="nav-pill">
                                Home Page
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* BOOKINGS TABLE */}
            <div className="section-wrap">
                <Container>
                    <div className="table-card shadow-soft">
                        <div className="table-tools">
                            <h3 className="m-0">Booked Cars</h3>
                        </div>
                        <div className="table-responsive custom-table-wrap">
                            <Table hover className="custom-table align-middle mb-0">
                                <thead className="sticky-head">
                                    <tr>
                                        <th>#ID</th>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Car</th>
                                        <th>Period</th>
                                        <th>Status</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {booking?.map((b, index) => (
                                        <tr key={index} className="row-elevate">
                                            <td className="muted">#{b.id}</td>
                                            <td>
                                                {b.user.firstname} {b.user.lastname}
                                            </td>
                                            <td>{b.user.email}</td>
                                            <td>
                                                {b.vehicle.brand} {b.vehicle.model} ({b.vehicle.year})
                                            </td>
                                            <td>
                                                {b.startDate} → {b.endDate}
                                            </td>
                                            <td>
                                                <span
                                                    className={`badge-soft ${b.confirmed ? "badge-success" : "badge-muted"
                                                        }`}
                                                >
                                                    {b.confirmed ? "Confirmed" : "Pending"}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <div className="d-flex gap-2 justify-content-center">
                                                    {!b.confirmed && (
                                                        <Button
                                                            size="sm"
                                                            className="btn-soft-primary"
                                                            onClick={() => handleConfirm(b.id)}
                                                        >
                                                            Confirm
                                                        </Button>
                                                    )}
                                                    <Button
                                                        size="sm"
                                                        className="btn-soft-danger"
                                                        onClick={() => handleCancel(b.id)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default BookedCars;
