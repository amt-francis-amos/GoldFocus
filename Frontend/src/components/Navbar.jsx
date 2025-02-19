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
          {["/", "/about", "/services", "/contact"].map((path, index) => {
            const labels = ["Home", "About", "Services", "Contact"];
            const isActive = location.pathname === path;
            return (
              <li key={index} className="relative group">
                <Link 
                  to={path}
                  className={`transition-all duration-300 ${
                    isActive ? "font-bold text-gray-900" : "hover:text-gray-700"
                  }`}
                >
                  {labels[index]}
                  <span
                    className={`absolute left-0 bottom-0 w-full h-[2px] bg-[#FFD700] transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </Link>
              </li>
            );
          })}
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
            {["/", "/about", "/services", "/contact"].map((path, index) => {
              const labels = ["Home", "About", "Services", "Contact"];
              const isActive = location.pathname === path;
              return (
                <li key={index}>
                  <Link
                    to={path}
                    className={`text-black ${isActive ? "font-bold underline" : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {labels[index]}
                  </Link>
                </li>
              );
            })}
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
