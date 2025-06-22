import BookForm from '../book-form';
import "./index.css";
import CustomNavbar from '../../components/Navbar';
import vidio from '../../videos/video1.mp4';

const Header = () => {
  return (
    <>
      {/* importing vidio */}
      <header className='header'>
        <CustomNavbar />
        <video
          className="video-background"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={vidio} type="video/mp4" />
        </video>
        <div className="header-attribute">
          <div className="header-content">
            <h1>Fast & Easy Way To Rent A Car</h1>
            <h3>A small river named Duden flows by their place and supplies it with the necessary<br />
              regelialia. It is a paradisematic country, in which roasted parts</h3>
          </div>
          <BookForm />
        </div>
      </header>
    </>
  )
}

export default Header;