
import './index.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import Footer from '../../components/Footer';
import CustomNavbar from '../../components/Navbar';

const cities = [
    { id: 1, name: 'Tirana', position: [41.3275, 19.8187] },
    { id: 2, name: 'Durrës', position: [41.3246, 19.4565] },
    { id: 3, name: 'Shkodër', position: [42.0683, 19.5126] },
    { id: 4, name: 'Vlorë', position: [40.4661, 19.4914] },
    { id: 5, name: 'Fier', position: [40.7239, 19.5560] },
    { id: 6, name: 'Elbasan', position: [41.1125, 20.0822] },
    { id: 7, name: 'Korçë', position: [40.6141, 20.7778] },
    { id: 8, name: 'Berat', position: [40.7058, 19.9522] },
    { id: 9, name: 'Lezhë', position: [41.7836, 19.6436] },
    { id: 10, name: 'Gjirokastër', position: [40.0758, 20.1389] },
];

const cityIcon = L.divIcon({
    className: 'city-map-marker',
    html: '<span></span>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
});

const Location = () => {
    return (
        <>
            {/* Hero — ruajmë foton dhe tekstin */}
            <section className="location-page">
                <CustomNavbar />

                <div className="location-title">
                    <h1>Visit us at our central location.</h1>
                    <p>
                        Let the road lead you to us...
                        <br />
                        Where passion, design, and experience come together.
                        <br />
                        Use the map below to guide your way. We'll be here,
                        waiting to welcome you.
                    </p>
                </div>
            </section>

            {/* Location content */}
            <section className="location-content">
                <div className="location-heading">
                    <span>OUR DESTINATIONS</span>
                    <h2>Find your way across Albania.</h2>
                    <p>
                        Explore the cities on our map and choose your next
                        destination.
                    </p>
                </div>

                <div className="location-grid">
                    {/* Interactive map card */}
                    <div className="location-map-card">
                        <div className="location-card-heading">
                            <div>
                                <span>EXPLORE THE MAP</span>
                                <h3>Discover Albania</h3>
                            </div>
                            <span className="location-count">10 CITIES</span>
                        </div>

                        <div className="map-container">
                            <MapContainer
                                center={[41.1, 20.0]}
                                zoom={7.5}
                                scrollWheelZoom={false}
                                className="albania-map"
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {cities.map((city) => (
                                    <Marker
                                        key={city.id}
                                        position={city.position}
                                        icon={cityIcon}
                                    >
                                        <Popup>
                                            <div className="city-popup">
                                                <strong>{city.name}</strong>
                                                <a
                                                    href={`https://www.google.com/maps/search/?api=1&query=${city.position[0]},${city.position[1]}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Open in Google Maps ↗
                                                </a>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>

                        <p className="map-caption">
                            <span className="map-caption-dot"></span>
                            Select a marker to explore a city.
                        </p>
                    </div>

                    {/* Information card */}
                    <div className="location-info-card">
                        <span className="location-eyebrow">
                            YOUR NEXT JOURNEY
                        </span>

                        <p className="location-description">
                            From the vibrant streets of Tirana to the
                            beautiful coastline of Vlorë, explore Albania
                            at your own pace with Luxury Rides.
                        </p>

                        <div className="location-divider"></div>

                        <h3>Explore destinations</h3>

                        <div className="city-list">
                            {cities.map((city) => (
                                <a
                                    key={city.id}
                                    href={`https://www.google.com/maps/search/?api=1&query=${city.position[0]},${city.position[1]}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="city-link"
                                >
                                    {city.name}
                                    <span>↗</span>
                                </a>
                            ))}
                        </div>

                        <p className="location-note">
                            Choose a city to view it on Google Maps.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Location;
