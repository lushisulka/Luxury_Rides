import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useCarContext } from '../../context/CarContext';
import { useBookingContext } from "../../context/BookingContext";
import { ImLocation2 } from "react-icons/im";
import { IoCarSportSharp } from "react-icons/io5";
import cities from "./cities";
import './index.css';

const BookForm = () => {
    const { bookedCars } = useCarContext();
    const { authUser } = useAuthContext();
    const { createBooking } = useBookingContext();

    const [formData, setFormData] = useState({
        pickup: "",
        dropoff: "",
        startDate: "",
        endDate: "",
        vehicle_id: 0,
        userId: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    //console.log("authUser", authUser)

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createBooking({ user_id: authUser.id, vehicle_id: parseInt(formData.vehicle_id), pickup: formData.pickup, dropoff: formData.dropoff, startDate: formData.startDate, endDate: formData.endDate, confirmed: false });

    };

    return (
        <div className="book-form-container">
            <form className="form-container" onSubmit={handleSubmit}>
                <h2><IoCarSportSharp className="icon-title" /> Book Your Car</h2>

                {/* Rreshti i parë - Pickup & Dropoff */}
                <div className="form-row two-cols">
                    <div className="input-group">
                        <label><ImLocation2 className="icon" /> Pick up Location</label>
                        <select
                            name="pickup"
                            value={formData.pickup}
                            onChange={handleChange}
                        >
                            <option value="">-- Select City --</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <label><ImLocation2 className="icon" /> Drop Of Location</label>
                        <select
                            name="dropoff"
                            value={formData.dropoff}
                            onChange={handleChange}
                        >
                            <option value="">-- Select City --</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Rreshti i dytë - Start & End Dates */}
                <div className="form-row two-cols">
                    <div className="input-group">
                        <label>PICK-UP DATE</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label>DROP-OFF DATE</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row one-col">
                    <div className="input-group">
                        <label htmlFor="car">CHOOSE A CAR</label>
                        <select
                            id="car"
                            name="vehicle_id"
                            value={formData.vehicle_id || 0}
                            onChange={handleChange}
                        >
                            {bookedCars && bookedCars.length > 0 ? (
                                bookedCars.map((car) => (
                                    <option key={car.id} value={car.id}>
                                        {car.brand} {car.model} ({car.year}) - {car.color}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No cars available</option>
                            )}
                        </select>
                    </div>
                </div>
                <button type="submit" disabled={!authUser.id ? true : false} className="rent-button">{authUser.id ? "Book Now" : "Authenticate to Book"}</button>
            </form>
        </div>
    )
}

export default BookForm;
