import axios from 'axios';
const API_URL = 'http://localhost:3000/vehicles';

const get_cars_service = async () => {
  const result = await axios.get(`${API_URL}/all`);
  return result;
}


const create_cars_service = async (data) => {
  const formData = new FormData();

  console.log("data.image", { ...data.images });

  formData.append("brand", data.brand);
  formData.append("model", data.model);
  formData.append("color", data.color);
  formData.append("engine", parseInt(data.engine));
  formData.append("fuel", data.fuel);
  formData.append("year", parseInt(data.year));
  formData.append("transmission", data.transmission);
  formData.append("available", data.available);
  formData.append("description", data.description);
  formData.append("type", data.type);
  data.images.forEach((file) => {
    console.log("ïmages---", file);
    formData.append("images", file);
  });




  // const vehicles = {
  //   brand: data.brand,
  //   model: data.model,
  //   color: data.color,
  //   engine: data.engine,
  //   alimentation: data.alimentation,
  //   year: parseInt(data.year),
  //   transmission: data.transmission,
  //   type: data.type,
  //   available: data.available,
  //   description: data.description,
  // }

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
    alimentation: data.alimentation,
    year: parseInt(data.year),
    transmission: data.transmission,
    type: data.type,
    available: data.available,
    description: data.description,
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

export { get_cars_service, create_cars_service, delete_car_service, get_car_by_id_service, edit_car_service }