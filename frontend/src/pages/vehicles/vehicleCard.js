import { Card } from "react-bootstrap"
const VehicleCard = ({ car }) => {
  console.log("car---", car);
  return (
    <>
      <Card className="vehicle-card">
        <Card.Img variant="top" src={`http://localhost:3000/vehicles/uploads/${car.images[0]}`} />
        <Card.Body>
          <Card.Title>
            <a href={`vehicle/${car.id}`}>
              {car.brand} {car.model}
            </a>
          </Card.Title>
          <Card.Text>
            {car.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
export default VehicleCard;