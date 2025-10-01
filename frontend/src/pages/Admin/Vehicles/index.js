import { useState } from 'react';
import { Navbar, Nav, Container, Button, Table } from 'react-bootstrap';
import './index.css';
import CreateVehicle from './createModal';
import EditVehicle from './editModal';
import { useCarContext } from '../../../context/CarContext';

const AdminVehicles = () => {
  const { cars, deleteCar } = useCarContext();
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [vehicleId, setVehicleId] = useState(0);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const closeEditModal = () => {
    setEditModal(!editModal);
  }

  const handleDelete = async (id) => {
    return await deleteCar(id);
  }

  const handleEdit = (id) => {
    setVehicleId(id);
    setEditModal(!editModal);
  }

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
              <Nav.Link href="/admin-vehicles" className="nav-pill active">Vehicles</Nav.Link>
              <Nav.Link href="/admin-booked-vehicles" className="nav-pill">Booking</Nav.Link>
              <Nav.Link href="/" className="nav-pill">Home Page</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* HEADER ACTIONS */}
      <div className="section-wrap">
        <Container>
          <div className="header-card shadow-soft">
            <div>
              <h1 className="title">Vehicles</h1>
              <p className="subtitle">Manage your fleet: add, preview, edit or remove vehicles.</p>
            </div>
            <div className="actions">
              <Button className="btn-gradient" onClick={handleShow}>
                + New Vehicle
              </Button>
            </div>
          </div>

          {/* TABLE CARD */}
          <div className="table-card shadow-soft">
            <div className="table-tools">
              <div className="search-faux">
                <span className="search-icon">⌕</span>
                <input className="search-input" placeholder="Search by brand, model, year…" />
              </div>
            </div>

            <div className="table-responsive custom-table-wrap">
              <Table hover className="custom-table align-middle mb-0">
                <thead className="sticky-head">
                  <tr>
                    <th>#ID</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Availability</th>
                    <th>Transmission</th>
                    <th>Engine</th>
                    <th>Images</th>
                    <th>Price</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars?.map((car, index) => {
                    return (
                      <tr key={index} className="row-elevate">
                        <td className="muted">#{car.id}</td>
                        <td className="fw-600">{car.brand}</td>
                        <td>{car.model}</td>
                        <td>{car.year}</td>
                        <td>
                          <span className={`badge-soft ${car.available ? 'badge-success' : 'badge-muted'}`}>
                            {car.available ? "Available" : "Not Available"}
                          </span>
                        </td>
                        <td>
                          <span className="chip">
                            {car.transmission ? "Automatic" : "Manual"}
                          </span>
                        </td>
                        <td className="muted">{car.engine}</td>
                        <td>
                          <div className="thumbs">
                            {car?.images?.map((image, i) => (
                              <img
                                key={i}
                                src={`http://localhost:3000/vehicles/uploads/${image}`}
                                alt=""
                                className="thumb"
                              />
                            ))}
                          </div>
                        </td>
                        <td>{car.price} €</td>
                        <td className="text-center">
                          <div className="d-flex gap-2 justify-content-center">
                            <Button size="sm" className="btn-soft-primary" onClick={() => { handleEdit(car.id) }}>
                              Edit
                            </Button>
                            <Button size="sm" className="btn-soft-danger" onClick={() => { handleDelete(car.id) }}>
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </Container>
      </div>

      <CreateVehicle open={showModal} close={handleClose} />
      <EditVehicle sindi={editModal} close={closeEditModal} id={vehicleId} />
    </>
  );
}

export default AdminVehicles;
