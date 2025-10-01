import { createContext, useContext, useState, useEffect } from "react";
import { create_booking_service, get_all_bookings_service, confirm_booking_service, remove_booking_service, getUserBookings } from "../Services/bookingServices";
import { useCarContext } from "./CarContext";
const BookingContext = createContext({});
const BookingProvider = (props) => {
  const [booking, setBooking] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const { triggerCar, setTriggerCar } = useCarContext();

  useEffect(() => {
    getAllBookings();
  }, [trigger]);

  const getAllBookings = async () => {
    try {
      const result = await get_all_bookings_service();
      if (result.status === 200) {
        setBooking(result.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const createBooking = async (booking_data) => {
    try {
      const result = await create_booking_service(booking_data);
      if (result.data.status === 200) {
        setBooking(result.data.data);
        return result.data
      }
    } catch (error) {
      console.error('Error creating car:', error);
      throw error;
    }
  }

  const confirmBooking = async (id) => {
    try {
      const result = await confirm_booking_service(id);
      if (result.status === 200) {
        setTrigger(prev => !prev);
        setTriggerCar(!triggerCar)
        return result;
      }
    } catch (error) {
      console.error('Error creating car:', error);
      throw error;
    }
  }

  const removeBooking = async (id) => {
    try {
      const result = await remove_booking_service(id);
      if (result.status === 200) {
        setTrigger(prev => !prev);
        return result;
      }
    } catch (error) {
      console.error('Error creating car:', error);
      throw error;
    }
  }

  const getUserBookings = async (userId) => {
    try {
      const result = await get_all_bookings_service(); // supozojmë që thirrja i kthen të gjitha
      if (result.status === 200) {
        // filtro për userin e loguar
        const userBookings = result.data.filter(b => b.user.id === userId);
        return userBookings;
      }
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      return [];
    }
  };

  const values = { booking, createBooking, confirmBooking, removeBooking, getUserBookings };
  return (
    <BookingContext.Provider value={values}>
      {props.children}
    </BookingContext.Provider>)
}

const useBookingContext = () => { return useContext(BookingContext) };
export { BookingProvider, useBookingContext };