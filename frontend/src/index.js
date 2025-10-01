import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Location from "./pages/Location";
import About from "./pages/About";
import Vehicles from "./pages/Vehicle";
import { AuthProvider } from './context/AuthContext';
import { CarProvider } from './context/CarContext';
import { BookingProvider } from './context/BookingContext';

import VehicleDetails from './pages/VehicleDetails';
import AdminVehicles from './pages/Admin/Vehicles';
import BookedCars from './pages/Admin/BookedCars';


import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

import reportWebVitals from './reportWebVitals';
import BookingHistory from './pages/UserProfile';
axios.defaults.withCredentials = true;



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthProvider>
    <CarProvider>
      <BookingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/locations" element={<Location />} />
            <Route path="/about" element={<About />} />
            <Route path="/reserve" element={<Contact />} />
            <Route path="/our-vehicles" element={<Vehicles />} />
            <Route path="/vehicle/:id" element={<VehicleDetails />} />

            <Route path="/admin-vehicles" element={<AdminVehicles />} />
            <Route path="/admin-booked-vehicles" element={<BookedCars />}/>
            <Route path="/profiles" element={<BookingHistory />}/>


          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </CarProvider>
  </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();