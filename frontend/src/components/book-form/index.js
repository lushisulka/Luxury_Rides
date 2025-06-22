import { ImLocation2 } from "react-icons/im";
import { GiShakingHands } from "react-icons/gi";
import { IoCarSportSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './index.css';


const BookForm = () => {
    return (
        <div className="book-form-container">
            <div className="form-container">
                <h2>Make your trip</h2>
                <label>PICK-UP LOCATION</label>
                <input type="text" placeholder="City, Airport, Station, etc" />
                <label>DROP-OFF LOCATION</label>
                <input type="text" placeholder="City, Airport, Station, etc" />
                <div className="date-row">
                    <div>
                        <label>PICK-UP DATE</label>
                        <input type="date" />
                    </div>
                    <div>
                        <label>DROP-OFF DATE</label>
                        <input type="date" />
                    </div>
                </div>
                <label>PICK-UP TIME</label>
                <input type="time" />

                <button className="rent-button">Rent A Car</button>
            </div>

            <div className="content-right">
                <h2>Better Way To Rent Your Perfect Cars</h2>
                <div className="steps">
                    <div className="step">
                        <ImLocation2 />
                        <p>Choose Your Pickup Location</p>
                    </div>
                    <div className="step">
                        <GiShakingHands />
                        <p>Select the Best Deal</p>
                    </div>
                    <div className="step">
                        <IoCarSportSharp />
                        <p>Reserve Your Rental Car</p>
                    </div>
                </div>

                <Link to="/reserve" className="reserve-button">
                    Reserve
                </Link>

            </div>
        </div>
    )
}

export default BookForm;