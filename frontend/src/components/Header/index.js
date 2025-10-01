import BookForm from '../BookForm';
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
          </div>
          <BookForm />
        </div>
      </header>
    </>
  )
}

export default Header;