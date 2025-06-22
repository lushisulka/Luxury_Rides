import { useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useCarContext } from "../../../context/CarContext";

const EditVehicle = (props) => {
  const { editCar } = useCarContext();
  const [available, setAvailable] = useState(false);
  const [values, setValues] = useState({ brand: '', model: '', color: '', engine: '', fuel: '', year: 0, transmission: false, available: false, images: [], description: " ", type: " " });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues((prevState) => {
      return {
        ...prevState,
        [name]: name === "transmission" || name === "available" ? e.target.checked : value
      }
    })
  }

  // console.log("props---", props.close);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await editCar(props.id, values);
      console.log("result----", result);
      props.close();
    } catch (error) {
    }
  }

  return (
    <Modal show={props.sindi} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="car-brand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control name="brand" type="text" onChange={(e) => { handleChange(e) }} value={values.brand} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="car-model">
                  <Form.Label>Model</Form.Label>
                  <Form.Control name="model" type="text" onChange={(e) => { handleChange(e) }} value={values.model} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="car-color">
                  <Form.Label>Color</Form.Label>
                  <Form.Control name="color" type="text" onChange={(e) => { handleChange(e) }} value={values.color} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="car-engine">
                  <Form.Label>Engine</Form.Label>
                  <Form.Control name="engine" type="text" onChange={(e) => { handleChange(e) }} value={values.engine} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="fuel-type">
                  <Form.Label>Fuel Type</Form.Label>
                  <Form.Control name="fuel" type="text" onChange={(e) => { handleChange(e) }} value={values.fuel} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="vehicle-year">
                  <Form.Label>Vehicle Year</Form.Label>
                  <Form.Control name="year" type="number" onChange={(e) => { handleChange(e) }} value={values.year} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="car-type">
                  <Form.Label>car type</Form.Label>
                  <Form.Control name="type" type="text" onChange={(e) => { handleChange(e) }} value={values.type} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="car-description">
                  <Form.Label>car description</Form.Label>
                  <Form.Control name="description" type="text" onChange={(e) => { handleChange(e) }} value={values.description} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="car-transmission">
                  <Form.Label>Transmission</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="switch"
                      id="automatic"
                      label="Transimision"
                      name="transmission"
                      onChange={(e) => { handleChange(e) }}
                      value={values.transmission}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="vehicle-available">
                  <Form.Label>Available</Form.Label>
                  <div>
                    <Form.Check
                      type="switch"
                      name="available"
                      id="available"
                      label={available ? "Yes" : "No"}
                      onChange={(e) => { handleChange(e) }}
                      value={values.available}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Photos</Form.Label>
              <Form.Control type="file" multiple name='image' onChange={(e) => { handleChange(e) }} value={values.images} />
            </Form.Group>

            {/* Add more fields if needed */}
            <Modal.Footer>
              <Button variant="secondary" onClick={props.close}>
                Close
              </Button>
              <Button type="submit" variant="primary"> Save Changes</Button>
            </Modal.Footer>
          </Container>
        </Form>
      </Modal.Body>
    </Modal >
  );
};

export default EditVehicle;
