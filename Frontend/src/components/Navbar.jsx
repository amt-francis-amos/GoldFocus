import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-[#FFD700] shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-black font-bold text-2xl">
          <img className="w-15" src={assets.goldLogo} alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-black font-medium">
          <li>
            <Link
              to="/"
              className={`${
                location.pathname === "/" ? "font-bold underline text-gray-900" : "hover:text-gray-700"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`${
                location.pathname === "/about" ? "font-bold underline text-gray-900" : "hover:text-gray-700"
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={`${
                location.pathname === "/services" ? "font-bold underline text-gray-900" : "hover:text-gray-700"
              }`}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`${
                location.pathname === "/contact" ? "font-bold underline text-gray-900" : "hover:text-gray-700"
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Login Button */}
        <Link to="/login" className="hidden md:block bg-black text-white px-8 py-2 rounded hover:bg-gray-800 transition">
          Login
        </Link>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#FFD700] py-4">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link
                to="/"
                className={`${
                  location.pathname === "/" ? "font-bold underline text-gray-900" : "text-black"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`${
                  location.pathname === "/about" ? "font-bold underline text-gray-900" : "text-black"
                }`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className={`${
                  location.pathname === "/services" ? "font-bold underline text-gray-900" : "text-black"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`${
                  location.pathname === "/contact" ? "font-bold underline text-gray-900" : "text-black"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="bg-black text-white px-8 py-2 rounded" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
