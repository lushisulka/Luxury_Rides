import './index.css';
import Footer from '../../components/Footer';
import CustomNavbar from '../../components/Navbar';

const Location = () => {
    const handleMapClick = () => {
        // Replace these coordinates with your actual location
        const latitude = 41.3275; // Example: Tirana coordinates
        const longitude = 19.8187;
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(googleMapsUrl, '_blank');
    };

    return (
        <>
            <div className="location-page">
                <CustomNavbar />
                <div className="location-title">
                    <h1>Visit us at our central location.</h1>
                    <p>
                        Let the road lead you to us...<br />
                        Where passion, design, and experience come together.<br />
                        Use the map below to guide your way. We'll be here, waiting to welcome you.
                    </p>
                </div>
            </div>

            <div className="location-content">
                <p>Find us in the heart of the city.</p>

                <div className="map-container">
                    <div className="map-photo" onClick={handleMapClick}>
                        <div className="location-pin">
                            <div className="pin-icon">📍</div>
                            <div className="pin-pulse"></div>
                        </div>
                        <div className="map-click-instruction">
                            Click to open in Maps
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="cta-section">
                    <h2>Ready to Start Your Journey?</h2>
                    <p>Visit us today or give us a call to reserve your perfect rental car!</p>
                    <button className="cta-button" onClick={() => window.location.href = 'tel:+35569123456'}>
                        Call Now: +355 69 75 48 371
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Location;