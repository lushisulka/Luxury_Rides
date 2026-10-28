
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useAuthContext } from "../../context/AuthContext";
import { useCarContext } from "../../context/CarContext";
import { useBookingContext } from "../../context/BookingContext";
import { ImLocation2 } from "react-icons/im";
import { IoCarSportSharp } from "react-icons/io5";
import {
    FiChevronDown,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";
import cities from "./cities";
import "./index.css";

const getLocalDate = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const formatDate = (value) => {
    if (!value) return "";

    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
};

const getRentalDays = (startDate, endDate) => {
    if (!startDate || !endDate || endDate < startDate) return 0;

    const start = new Date(`${startDate}T12:00:00`);
    const end = new Date(`${endDate}T12:00:00`);

    return Math.max(
        1,
        Math.round((end - start) / (1000 * 60 * 60 * 24))
    );
};

const closeOtherPopups = () => {
    window.dispatchEvent(new Event("closeBookFormPopups"));
};

const CustomDropdown = ({ value, options, placeholder, onChange }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const closeDropdown = () => setOpen(false);

        window.addEventListener("closeBookFormPopups", closeDropdown);

        return () => {
            window.removeEventListener(
                "closeBookFormPopups",
                closeDropdown
            );
        };
    }, []);

    const selected = options.find(
        (option) => String(option.value) === String(value)
    );

    const toggleDropdown = () => {
        if (!open) {
            closeOtherPopups();
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    return (
        <div className="custom-dropdown">
            <button
                type="button"
                className={`custom-dropdown-trigger ${open ? "dropdown-open" : ""
                    }`}
                onClick={toggleDropdown}
                aria-expanded={open}
            >
                <span>{selected?.label || placeholder}</span>

                <FiChevronDown
                    className={`dropdown-arrow ${open ? "rotated" : ""
                        }`}
                />
            </button>

            {open && (
                <div className="custom-dropdown-menu">
                    {options.map((option) => (
                        <button
                            type="button"
                            key={option.value}
                            className={`custom-dropdown-option ${String(option.value) === String(value)
                                    ? "selected"
                                    : ""
                                }`}
                            onClick={() => {
                                onChange(option.value);
                                setOpen(false);
                            }}
                        >
                            {option.label}
                        </button>
                    ))}

                    {options.length === 0 && (
                        <p className="dropdown-empty">
                            No options available.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

const CustomDatePicker = ({
    value,
    minDate,
    onChange,
    placeholder,
}) => {
    const [open, setOpen] = useState(false);

    const initialDate = value
        ? new Date(`${value}T12:00:00`)
        : new Date(`${minDate}T12:00:00`);

    const [viewMonth, setViewMonth] = useState(
        new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
    );

    useEffect(() => {
        const closeCalendar = () => setOpen(false);

        window.addEventListener("closeBookFormPopups", closeCalendar);

        return () => {
            window.removeEventListener(
                "closeBookFormPopups",
                closeCalendar
            );
        };
    }, []);

    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const minimumDate = new Date(`${minDate}T12:00:00`);
    const previousMonth = new Date(year, month - 1, 1);

    const minimumMonth = new Date(
        minimumDate.getFullYear(),
        minimumDate.getMonth(),
        1
    );

    const canGoBack = previousMonth >= minimumMonth;

    const monthName = viewMonth.toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
    });

    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const chooseDate = (day) => {
        const dateValue = getLocalDate(new Date(year, month, day));

        if (dateValue < minDate) return;

        onChange(dateValue);
        setOpen(false);
    };

    const toggleCalendar = () => {
        if (open) {
            setOpen(false);
            return;
        }

        closeOtherPopups();

        const selectedDate = value
            ? new Date(`${value}T12:00:00`)
            : new Date(`${minDate}T12:00:00`);

        setViewMonth(
            new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                1
            )
        );

        setOpen(true);
    };

    return (
        <div className="custom-date-picker">
            <button
                type="button"
                className={`custom-date-trigger ${open ? "dropdown-open" : ""
                    }`}
                onClick={toggleCalendar}
                aria-expanded={open}
            >
                <span>{value ? formatDate(value) : placeholder}</span>
                <span className="calendar-icon">▦</span>
            </button>

            {open && (
                <div className="custom-calendar">
                    <div className="calendar-header">
                        <button
                            type="button"
                            disabled={!canGoBack}
                            onClick={() => setViewMonth(previousMonth)}
                            aria-label="Previous month"
                        >
                            <FiChevronLeft />
                        </button>

                        <strong>{monthName}</strong>

                        <button
                            type="button"
                            onClick={() =>
                                setViewMonth(
                                    new Date(year, month + 1, 1)
                                )
                            }
                            aria-label="Next month"
                        >
                            <FiChevronRight />
                        </button>
                    </div>

                    <div className="calendar-grid">
                        {weekdays.map((day) => (
                            <span className="calendar-weekday" key={day}>
                                {day}
                            </span>
                        ))}

                        {Array.from(
                            { length: firstDay },
                            (_, index) => (
                                <span
                                    className="calendar-empty"
                                    key={`empty-${index}`}
                                />
                            )
                        )}

                        {Array.from(
                            { length: daysInMonth },
                            (_, index) => {
                                const day = index + 1;
                                const dateValue = getLocalDate(
                                    new Date(year, month, day)
                                );

                                const disabled = dateValue < minDate;
                                const selected = dateValue === value;

                                return (
                                    <button
                                        type="button"
                                        key={day}
                                        disabled={disabled}
                                        className={`calendar-day ${selected ? "active-day" : ""
                                            }`}
                                        onClick={() => chooseDate(day)}
                                    >
                                        {day}
                                    </button>
                                );
                            }
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const BookForm = () => {
    const navigate = useNavigate();

    const { bookedCars } = useCarContext();
    const { authUser, setShowLogin } = useAuthContext();
    const { createBooking } = useBookingContext();

    const today = getLocalDate();

    const [formData, setFormData] = useState({
        pickup: "",
        dropoff: "",
        startDate: "",
        endDate: "",
        vehicle_id: "",
    });

    const [message, setMessage] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedCar = (bookedCars || []).find(
        (car) => String(car.id) === String(formData.vehicle_id)
    );

    const rentalDays = getRentalDays(
        formData.startDate,
        formData.endDate
    );

    const pricePerDay = Number(selectedCar?.price);

    const totalPrice =
        selectedCar &&
            Number.isFinite(pricePerDay) &&
            rentalDays > 0
            ? pricePerDay * rentalDays
            : 0;

    const updateField = (name, value) => {
        setFormData((previous) => ({
            ...previous,
            [name]: value,
            ...(name === "startDate" &&
                previous.endDate &&
                previous.endDate < value
                ? { endDate: "" }
                : {}),
        }));

        setMessage("");
    };

    const cityOptions = cities.map((city) => ({
        value: city.name,
        label: city.name,
    }));

    const carOptions = (bookedCars || [])
        .filter((car) => car.available)
        .map((car) => ({
            value: String(car.id),
            label: `${car.brand} ${car.model} (${car.year})`,
        }));

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage("");

        if (!authUser?.id) {
            setShowLogin(true);
            return;
        }

        if (
            !formData.pickup ||
            !formData.dropoff ||
            !formData.startDate ||
            !formData.endDate ||
            !formData.vehicle_id
        ) {
            setMessage("Please complete all fields.");
            return;
        }

        if (
            formData.startDate < today ||
            formData.endDate < today
        ) {
            setMessage("Past dates cannot be selected.");
            return;
        }

        if (formData.endDate < formData.startDate) {
            setMessage(
                "Drop-off date must be on or after pick-up date."
            );
            return;
        }

        if (!selectedCar || !selectedCar.available) {
            setMessage("This vehicle is currently unavailable.");
            return;
        }

        if (!Number.isFinite(pricePerDay) || pricePerDay < 0) {
            setMessage("The vehicle price is currently unavailable.");
            return;
        }

        setShowConfirm(true);
    };

    const confirmBooking = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        setMessage("");

        try {
            await createBooking({
                user_id: authUser.id,
                vehicle_id: Number(formData.vehicle_id),
                pickup: formData.pickup,
                dropoff: formData.dropoff,
                startDate: formData.startDate,
                endDate: formData.endDate,
                confirmed: false,
            });

            setShowConfirm(false);
            setMessage("Booking request submitted successfully!");
        } catch (error) {
            console.error("Booking error:", error);

            setShowConfirm(false);
            setMessage(
                error?.response?.data?.message ||
                error?.message ||
                "Booking failed. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const exploreCars = () => {
        setShowConfirm(false);
        navigate("/vehicles");
    };

    return (
        <div className="book-form-container">
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>
                    Book Your Car
                </h2>


                <div className="form-row two-cols">
                    <div className="input-group">
                        <label>
                            Pick-up Location
                        </label>

                        <CustomDropdown
                            value={formData.pickup}
                            options={cityOptions}
                            placeholder="Select city"
                            onChange={(value) => updateField("pickup", value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>
                            Drop-off Location
                        </label>

                        <CustomDropdown
                            value={formData.dropoff}
                            options={cityOptions}
                            placeholder="Select city"
                            onChange={(value) => updateField("dropoff", value)}
                        />
                    </div>

                    
                </div>

                <div className="form-row two-cols">
                    <div className="input-group">
                        <label>Pick-up Date</label>

                        <CustomDatePicker
                            value={formData.startDate}
                            minDate={today}
                            placeholder="Select pick-up date"
                            onChange={(value) => updateField("startDate", value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Drop-off Date</label>

                        <CustomDatePicker
                            value={formData.endDate}
                            minDate={formData.startDate || today}
                            placeholder="Select drop-off date"
                            onChange={(value) => updateField("endDate", value)}
                        />
                    </div>
                </div>


                <div className="form-row one-col">
                    <div className="input-group">
                        <label>Choose a Car</label>

                        <CustomDropdown
                            value={formData.vehicle_id}
                            options={carOptions}
                            placeholder="Select a car"
                            onChange={(value) =>
                                updateField("vehicle_id", value)
                            }
                        />
                    </div>
                </div>

                {message && (
                    <p className="booking-message" role="status">
                        {message}
                    </p>
                )}

                <button type="submit" className="rent-button">
                    {authUser?.id ? "Book Now" : "Log in to Book"}
                </button>
            </form>

            <Modal
                show={showConfirm}
                onHide={() => {
                    if (!isSubmitting) setShowConfirm(false);
                }}
                centered
                contentClassName="booking-confirm-modal"
                backdrop={isSubmitting ? "static" : true}
                keyboard={!isSubmitting}
            >
                <Modal.Header closeButton={!isSubmitting}>
                    <Modal.Title>Confirm Your Booking</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to confirm this booking?</p>

                    {selectedCar && (
                        <div className="confirm-booking-summary">
                            <p>
                                <strong>Vehicle:</strong>{" "}
                                {selectedCar.brand} {selectedCar.model}
                            </p>

                            <p>
                                <strong>Year:</strong> {selectedCar.year}
                            </p>

                            <p>
                                <strong>Price per day:</strong>{" "}
                                €{pricePerDay.toFixed(2)}
                            </p>

                            <p>
                                <strong>Pick-up:</strong>{" "}
                                {formatDate(formData.startDate)}
                            </p>

                            <p>
                                <strong>Drop-off:</strong>{" "}
                                {formatDate(formData.endDate)}
                            </p>

                            <p>
                                <strong>Duration:</strong>{" "}
                                {rentalDays}{" "}
                                {rentalDays === 1 ? "day" : "days"}
                            </p>

                            <h4>
                                Total Price: €{totalPrice.toFixed(2)}
                            </h4>
                        </div>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowConfirm(false);
                            navigate(`/vehicle/${selectedCar.id}`);
                        }}
                    >
                        Explore Cars
                    </Button>

                    <Button
                        className="confirm-booking-button"
                        disabled={isSubmitting}
                        onClick={confirmBooking}
                    >
                        {isSubmitting
                            ? "Submitting..."
                            : "Confirm Booking"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BookForm;
