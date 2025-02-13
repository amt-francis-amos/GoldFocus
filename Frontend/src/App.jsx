import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";

const App = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();

  return (
    <div>
      {/* Show Navbar only when authenticated and not on login page */}
      {isAuthenticated && location.pathname !== "/login" && <Navbar />}
      
      <Routes>
        {/* Define a route for "/" */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        
        {/* Ensure authenticated users see Home */}
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      <Footer />
    </div>
  );
};

export default App;
