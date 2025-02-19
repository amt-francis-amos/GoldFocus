import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("user") === "true"
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("user") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="bg-white h-[96px] shadow-md fixed w-full top-0 left-0 z-50 flex items-center">
      <div className="container mx-auto px-6 w-full flex justify-between items-center">
       
        <Link to="/" className="text-black font-bold text-2xl flex items-center">
        <img className="w-[100px] md:w-[140px] lg:w-[120px]" src={assets.goldLogo} alt="Logo" />

        </Link>

      
        <ul className="hidden md:flex space-x-6 text-black font-medium items-center">
          <li className={`relative group ${location.pathname === "/" ? "font-bold text-gray-900" : "hover:text-gray-700"}`}>
            <Link to="/">Home</Link>
          </li>
          <li className={`relative group ${location.pathname === "/about" ? "font-bold text-gray-900" : "hover:text-gray-700"}`}>
            <Link to="/about">About</Link>
          </li>
          <li className={`relative group ${location.pathname === "/services" ? "font-bold text-gray-900" : "hover:text-gray-700"}`}>
            <Link to="/services">Services</Link>
          </li>
          <li className={`relative group ${location.pathname === "/contact" ? "font-bold text-gray-900" : "hover:text-gray-700"}`}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

      
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="hidden md:block bg-red-600 text-white px-8 py-2 rounded hover:bg-red-800 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="hidden md:block bg-black text-white px-8 py-2 rounded hover:bg-gray-800 transition"
          >
            Login
          </Link>
        )}

       
        <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

    
      {isOpen && (
        <div className="md:hidden bg-[#FFD700] py-4 absolute top-[88px] left-0 w-full shadow-md">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link to="/" className={`text-black ${location.pathname === "/" ? "font-bold underline" : ""}`} onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={`text-black ${location.pathname === "/about" ? "font-bold underline" : ""}`} onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className={`text-black ${location.pathname === "/services" ? "font-bold underline" : ""}`} onClick={() => setIsOpen(false)}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`text-black ${location.pathname === "/contact" ? "font-bold underline" : ""}`} onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-red-600 text-white px-8 py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="bg-black text-white px-8 py-2 rounded" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
