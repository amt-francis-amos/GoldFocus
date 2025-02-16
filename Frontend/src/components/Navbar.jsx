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
    <nav className="bg-[#FFD700] shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
       
        <Link to="/" className="text-black font-bold text-2xl">
          <img className="w-15" src={assets.goldLogo} alt="Logo" />
        </Link>

       
        <ul className="hidden md:flex space-x-6 text-black font-medium">
  {["/", "/about", "/services", "/contact"].map((path, index) => (
    <li key={index} className="relative group">
      <Link
        to={path}
        className={`relative pb-2 transition duration-300 ${
          location.pathname === path ? "font-bold text-gray-900" : "hover:text-gray-700"
        }`}
      >
        {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
        <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-gray-900 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
      </Link>
    </li>
  ))}
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

        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#FFD700] py-4">
          <ul className="flex flex-col items-center space-y-4">
            {["/", "/about", "/services", "/contact"].map((path, index) => (
              <li key={index}>
                <Link
                  to={path}
                  className={`${
                    location.pathname === path
                      ? "font-bold underline text-gray-900"
                      : "text-black"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {path === "/"
                    ? "Home"
                    : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              </li>
            ))}

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
              <Link
                to="/login"
                className="bg-black text-white px-8 py-2 rounded"
                onClick={() => setIsOpen(false)}
              >
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
