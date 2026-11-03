
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./index.css";

const About = () => {
    return (
        <>
            {/* Hero — ruajmë pamjen ekzistuese */}
            <div className="about-background">
                <CustomNavbar />

                <div className="about-title">
                    <h1>Where elegance meets the road</h1>
                    <p>
                        At LUXURY RIDES, we believe that every journey deserves style,
                        comfort, and a touch of sophistication. From premium cars to
                        unforgettable experiences, we’re here to redefine the way you
                        travel.
                    </p>
                </div>
            </div>

            {/* Our Story */}
            <section className="about-story">
                <Container>
                    <Row className="align-items-center g-4">
                        <Col lg={4}>
                            <div className="story-label">OUR STORY</div>
                            <h2>
                                Every journey
                                <br />
                                deserves more.
                            </h2>
                        </Col>

                        <Col lg={8}>
                            <p className="story-description">
                                Luxury Rides is about more than getting from one place to
                                another. It is about enjoying the journey, choosing the right
                                vehicle, and experiencing comfort from the moment you set off.
                            </p>

                            <p className="story-description">
                                Whether you are travelling for business, celebrating a special
                                occasion, or simply looking for a better driving experience,
                                we aim to make every rental simple, comfortable, and memorable.
                            </p>

                            <a href="/our-vehicles" className="story-link">
                                Discover our collection <span>↗</span>
                            </a>
                        </Col>
                    </Row>
                </Container>
            </section>


            {/* Statistics — minimalist design */}
            <div className="about-body">
                <Container>
                    <div className="about-stats">
                        <div className="about-stat">
                            <h3>20<span>+</span></h3>
                            <p>Years of Experience</p>
                        </div>

                        <div className="about-stat">
                            <h3>1,000<span>+</span></h3>
                            <p>Cars in Our Collection</p>
                        </div>

                        <div className="about-stat">
                            <h3>2,500<span>+</span></h3>
                            <p>Happy Customers</p>
                        </div>

                        <div className="about-stat">
                            <h3>60</h3>
                            <p>Locations</p>
                        </div>
                    </div>
                </Container>
            </div>


            {/* What makes us different */}
            <section className="about-experience">
                <Container>
                    <div className="experience-heading">
                        <span>THE LUXURY RIDES EXPERIENCE</span>
                        <h2>Designed around your journey.</h2>
                        <p>
                            A premium rental experience, with the essentials taken care of.
                        </p>
                    </div>

                    <Row className="experience-list">
                        <Col md={4}>
                            <article className="experience-item">
                                <span className="experience-number">01</span>
                                <h3>A considered collection</h3>
                                <p>
                                    Explore a selection of vehicles to find the right fit for
                                    your plans, preferences, and journey.
                                </p>
                            </article>
                        </Col>

                        <Col md={4}>
                            <article className="experience-item">
                                <span className="experience-number">02</span>
                                <h3>Booking made simple</h3>
                                <p>
                                    Browse available vehicles and book your preferred car
                                    through a straightforward rental process.
                                </p>
                            </article>
                        </Col>

                        <Col md={4}>
                            <article className="experience-item">
                                <span className="experience-number">03</span>
                                <h3>Service that fits you</h3>
                                <p>
                                    From everyday travel to special occasions, find a rental
                                    option suited to your needs.
                                </p>
                            </article>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Footer />
        </>
    );
};

export default About;
