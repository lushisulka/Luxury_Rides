import axios from 'axios';
const API_URL = 'http://localhost:3000/vehicles';

const get_cars_service = async () => {
  const result = await axios.get(`${API_URL}/all`);
  return result.data;
}

const get_featured_cars_service = async () => {
  const result = await axios.get(`${API_URL}/featured`);
  return result.data;
}

const create_cars_service = async (data) => {
  const formData = new FormData();

  formData.append("brand", data.brand);
  formData.append("model", data.model);
  formData.append("color", data.color);
  formData.append("engine", parseInt(data.engine));
  formData.append("fuel", data.fuel);
  formData.append("year", parseInt(data.year));
  formData.append("transmission", data.transmission);
  formData.append("available", data.available);
  formData.append("price", data.price);
  data.images.forEach((file) => {
    formData.append("images", file);
  });
  const result = await axios.post(`${API_URL}/create`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return result;
}

const edit_car_service = async (id, data) => {

  const vehicles = {
    brand: data.brand,
    model: data.model,
    color: data.color,
    engine: parseFloat(data.engine),
    fuel: data.fuel,
    year: parseInt(data.year),
    transmission: data.transmission,
    available: data.available,
    price:data.price
  }
  const result = await axios.put(`${API_URL}/${id}`, vehicles);
  return result;
}

const delete_car_service = async (id) => {
  const result = await axios.delete(`${API_URL}/${id}`);
  return result;
}

const get_car_by_id_service = async (id) => {
  const result = await axios.get(`${API_URL}/${id}`);
  return result;
}

export { get_cars_service, get_featured_cars_service, create_cars_service, delete_car_service, get_car_by_id_service, edit_car_service }