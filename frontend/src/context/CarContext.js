import { createContext, useContext, useState, useEffect } from "react";
import { get_cars_service, create_cars_service, delete_car_service, get_car_by_id_service, edit_car_service } from "../Services/carServices";

const CarContext = createContext({});
const CarProvider = (props) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getAllCart();
  }, []);

  const getAllCart = async () => {
    try {
      const result = await get_cars_service();
      if (result.status === 200) {
        setCars(result.data);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  }

  const createCar = async (vehicles) => {
    try {
      const result = await create_cars_service(vehicles);
      if (result.status === 200) {
        getAllCart();
      }
    } catch (error) {
      console.error('Error creating car:', error);
      throw error;
    }
  }

  const deleteCar = async (id) => {
    try {
      const result = await delete_car_service(id);
      //console.log('Delete car with ID:', result);
      if (result.status === 200) {
        getAllCart();
        return result;
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      throw error;
    }
  }

  const getCarById = async (id) => {
    try {
      const result = await get_car_by_id_service(id);
      //console.log('Delete car with ID:', result);
      if (result.status === 200) {
        return result.data;
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      throw error;
    }
  }

  const editCar = async (id, updatedCar) => {
    try {
      const result = await edit_car_service(id, updatedCar);
      console.log("resutl----", result);
      if (result.status === 200) {
        getAllCart();
      }
    } catch (error) {
      console.error('Error editing car:', error);
      throw error;
    }

  }

  const values = { cars, setCars, createCar, deleteCar, getCarById, editCar };

  return (
    <CarContext.Provider value={values}>
      {props.children}
    </CarContext.Provider>)
}

const useCarContext = () => { return useContext(CarContext) };
export { CarProvider, useCarContext };




<h2>
  hello from CarContext
</h2>
