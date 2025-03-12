import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          "https://goldfocus-backend.onrender.com/api/auth/user"
        );
        setUserId(response.data.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        {userId && <Route path="/dashboard" element={<InvestmentDashboard userId={userId} />} />}
      </Routes>
    
      {location.pathname !== "/login" && <Footer />}
    </div>
  );
};

export default App;
