import Logo from "../assets/images/home/logo.png";
import { useState } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="  bg-white text-lg w-[98%]  xl:w-[85%] mt-3">
      <nav className="  w-full mx-auto px-2 flex items-center justify-between  border-0 lg:py-4 py-3  rounded-full shadow-custom-header-shadow   lg:mt-9 mt-4">
        {/* Logo */}
        <a href="">
          <img src={Logo} alt="Logo" className="img-fluid xs:h-10 lg:ps-8" />
        </a>

        {/* Hamburger Icon */}
        <button
          className="lg:hidden flex flex-col gap-1 pe-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-7 h-0.5 bg-black"></span>
          <span className="w-7 h-0.5 bg-black"></span>
          <span className="w-7 h-0.5 bg-black"></span>
        </button>

        {/* Main Menu (Desktop) */}
        <div className="hidden lg:flex items-center gap-7 xl:text-lg md:text-md sm:text-md text-sm  font-normal">
          <a href="">Home</a>
          <a href="">About Us</a>
          <a href="">Our Services</a>
          <a href="">Products</a>
          <a href="">Pet Care</a>
        </div>

        {/* Buttons (Desktop) */}
        <div className="hidden lg:flex gap-4 ps-5 pe-8">
          <button className="bg-custom-peach px-9 py-3  xl:text-lg md:text-md sm:text-md text-sm rounded-4xl">Log In</button>
          <button className=" bg-custom-orange px-6 py-3 xl:text-lg md:text-md sm:text-md text-sm rounded-4xl">Book Now</button>
        </div>
      </nav>

      {/* Offcanvas (Mobile Menu) - Slide In From Right */}
      <div
        className={`lg:hidden fixed top-0 right-0 w-full h-full bg-white z-50 p-6 shadow-lg transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-evenly">
          <div className="flex flex-col items-center gap-15 mt-12 text-2xl font-medium">
          <button className="absolute top-4 pt-7 right-6 text-xl" onClick={() => setIsOpen(false)}>
          ✕
        </button>
          <a href="">Home</a>
          <a href="">About Us</a>
          <a href="">Our Services</a>
          <a href="">Products</a>
          <a href="">Pet Care</a>
        </div>
        <div className="mt-6 flex flex-col items-center gap-4 w-full me-5">
          <button className="bg-custom-peach text-white px-4 py-4 rounded-4xl w-90">Log In</button>
          <button className="bg-black text-white px-4 py-4 rounded-4xl w-90">Book Now</button>
        </div>
        </div>
        
      </div>
      
    </header>
  );
}

export default Header;
