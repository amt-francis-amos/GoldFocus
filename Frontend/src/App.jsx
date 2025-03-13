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
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("No authentication token found. Redirecting to login.");
          setUserId(null);
          navigate("/login");
          return;
        }

        const response = await axios.get("https://goldfocus-backend.onrender.com/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` }, // Fixed template literal syntax
        });

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
        setUserId(null);
      }
    };

    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      fetchUserId();
    } else {
      setUserId(storedUserId);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUserId(null);
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userId={userId} onLogout={handleLogout} />
      <main className="flex-grow pb-10"> 
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
      </main>
      {location.pathname !== "/login" && <Footer />}
    </div>
  );
};

export default App;
