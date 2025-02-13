import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication state on component mount & route change
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Remove auth from localStorage
    setIsAuthenticated(false); // Update state
    navigate("/login"); // Redirect to login page
  };

  const menuItems = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-[#FFD700] shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-black font-bold text-2xl">
          <img className="w-20" src={assets.goldLogo} alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-black font-medium">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? "font-bold underline text-gray-900"
                    : "hover:text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Conditional Buttons: Show Logout if authenticated, else show Get Started */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="hidden md:block bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/contact"
            className="hidden md:block bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Get Started
          </Link>
        )}

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#FFD700] py-4">
          <ul className="flex flex-col items-center space-y-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? "font-bold underline text-gray-900"
                      : "text-black"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-5 py-2 rounded-full"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/contact"
                  className="bg-black text-white px-5 py-2 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
