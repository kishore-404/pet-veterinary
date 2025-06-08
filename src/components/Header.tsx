import { Link, useLocation } from 'react-router-dom';
import Logo from "../assets/images/home/logo.png";
import { useState } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path :any) => location.pathname === path;

  return (
    <header className="bg-white  mx-auto text-lg my_container mt-3">
      <nav className="w-full px-2 flex items-center justify-between border-0 lg:py-4 py-3 rounded-full shadow-custom-header-shadow lg:mt-9 mt-4">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Logo" className="img-fluid xs:h-10 lg:ps-8" />
        </Link>

        {/* Hamburger Icon */}
        <button
          className="lg:hidden flex flex-col gap-1 pe-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-7 h-0.5 bg-black"></span>
          <span className="w-7 h-0.5 bg-black"></span>
          <span className="w-7 h-0.5 bg-black"></span>
        </button>

        {/* Main Menu (Desktop) */}
       <div className="hidden lg:flex items-center xl:gap-10 gap-6 xl:text-lg md:text-md sm:text-md text-sm font-normal">
  <Link to="/" className={`${isActive('/') ? 'text-[#f19a56] font-semibold' : 'text-black font-normal'}`}>Home</Link>
  <Link to="/about" className={`${isActive('/about') ? 'text-[#f19a56] font-semibold' : 'text-black font-normal'}`}>About Us</Link>
  <Link to="/services" className={`${isActive('/services') ? 'text-[#f19a56] font-semibold' : 'text-black font-normal'}`}>Our Services</Link>
  <Link to="/products" className={`${isActive('/products') ? 'text-[#f19a56] font-semibold' : 'text-black font-normal'}`}>Products</Link>
  <Link to="/pet-care" className={`${isActive('/pet-care') ? 'text-[#f19a56] font-semibold' : 'text-black font-normal'}`}>Pet Care</Link>
</div>


        {/* Buttons (Desktop) */}
        <div className="hidden lg:flex gap-4 ps-5 pe-8">
          <Link to="/login">
            <button className="bg-custom-peach px-9 py-3 xl:text-lg md:text-md sm:text-md text-sm rounded-4xl">Log In</button>
          </Link>
          <Link to="/booking">
            <button className="bg-custom-orange px-6 py-3 xl:text-lg md:text-md sm:text-md text-sm rounded-4xl">Book Now</button>
          </Link>
        </div>
      </nav>

      {/* Offcanvas (Mobile Menu) */}
      <div
        className={`lg:hidden fixed top-0 right-0 w-full h-full bg-white z-50 p-6 shadow-lg transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full justify-evenly">
          <div className="flex flex-col items-center gap-15 mt-12 text-2xl font-medium">
            <button className="absolute top-4 pt-7 right-6 text-xl" onClick={() => setIsOpen(false)}>
              ✕
            </button>
            <Link to="/" onClick={() => setIsOpen(false)} style={{ color: isActive('/') ? '#f19a56' : 'inherit' }}>Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} style={{ color: isActive('/about') ? '#f19a56' : 'inherit' }}>About Us</Link>
            <Link to="/services" onClick={() => setIsOpen(false)} style={{ color: isActive('/services') ? '#f19a56' : 'inherit' }}>Our Services</Link>
            <Link to="/products" onClick={() => setIsOpen(false)} style={{ color: isActive('/products') ? '#f19a56' : 'inherit' }}>Products</Link>
            <Link to="/pet-care" onClick={() => setIsOpen(false)} style={{ color: isActive('/pet-care') ? '#f19a56' : 'inherit' }}>Pet Care</Link>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4 w-full me-5">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <button className="bg-custom-peach text-white px-4 py-4 rounded-4xl w-90">Log In</button>
            </Link>
            <Link to="/booking" onClick={() => setIsOpen(false)}>
              <button className="bg-black text-white px-4 py-4 rounded-4xl w-90">Book Now</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
