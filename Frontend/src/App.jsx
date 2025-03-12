import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Home from "./pages/Home";
import InvestmentDashboard from "./components/InvestmentDashboard";
import axios from "axios";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("https://goldfocus-backend.onrender.com/api/auth/user");
        const fetchedUserId = response.data.userId;
  
        if (fetchedUserId) {
          setUserId(fetchedUserId);
          localStorage.setItem("userId", fetchedUserId);
        } else {
          console.warn("User ID is null or undefined");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
        localStorage.removeItem("userId");
      }
    };
  
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      fetchUserId();
    } else {
      setUserId(storedUserId);
    }
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUserId(null);
    navigate("/login");
  };

  return (
    <div>
      <Navbar userId={userId} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login setUserId={setUserId} />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        {userId ? (
          <Route path="/dashboard" element={<InvestmentDashboard userId={userId} />} />
        ) : (
          <Route path="/dashboard" element={<p>Loading user details...</p>} />
        )}
      </Routes>
      {location.pathname !== "/login" && <Footer />}
    </div>
  );
};

export default App;
