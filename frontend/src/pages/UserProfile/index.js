import CustomNavbar from '../../components/Navbar';
import { useBookingContext } from '../../context/BookingContext';
import "./index.css";

const BookingHistory = () => {
    const { booking } = useBookingContext();

    return (
        <>
            {/* Navbar */}
            <CustomNavbar />

            <div className="section-wrap">
                <h2 className="title-profile mb-4">Your Booking History</h2>

                {!booking || booking.length === 0 ? (
                    <p className="subtitle">You don't have any bookings yet.</p>
                ) : (
                    <div className="booking-cards">
                        {booking.map((b) => (
                            <div key={b.id} className="header-card shadow-soft mb-4">
                                <div style={{ flex: 1 }}>
                                    <h3 className="title">{b.vehicle?.brand} {b.vehicle?.model} ({b.vehicle?.year})</h3>
                                    <p className="subtitle">
                                        Pickup: {b.pickup || "-"} | Dropoff: {b.dropoff || "-"}
                                    </p>
                                    <p className="subtitle">
                                        Start: {b.startDate || "-"} | End: {b.endDate || "-"}
                                    </p>
                                    <span className={`badge-soft ${b.confirmed ? "badge-success" : "badge-muted"}`}>
                                        {b.confirmed ? "Confirmed" : "Pending"}
                                    </span>
                                </div>

                                <div className="thumbs">
                                    {b.vehicle?.images?.map((image, i) => (
                                        <img
                                            key={i}
                                            src={`http://localhost:3000/vehicles/uploads/${image}`}
                                            alt={`${b.vehicle?.brand} ${b.vehicle?.model}`}
                                            className="thumb"
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default BookingHistory;
