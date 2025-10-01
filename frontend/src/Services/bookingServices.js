import axios from "axios";
const url = `http://localhost:3000/booking`;

const create_booking_service = async (data) => {
    const result = await axios.post(`${url}/car`, data);
    return result;
}

const get_all_bookings_service = async () => {
    try {
        const result = await axios.get(`${url}/all`);
        return result;
    } catch (error) {
        console.error("Error fetching bookings:", error.response || error);
        throw error;
    }
};

const confirm_booking_service = async (id) => {
    try {
        const result = await axios.put(`${url}/confirm/${id}`);
        return result;
    } catch (error) {
        console.error("Error fetching bookings:", error.response || error);
        throw error;
    }
}

const remove_booking_service = async (id) => {
    try {
        const result = await axios.delete(`${url}/${id}`);
        return result;
    } catch (error) {
        console.error("Error fetching bookings:", error.response || error);
        throw error;
    }
}

export { create_booking_service, get_all_bookings_service, confirm_booking_service, remove_booking_service };