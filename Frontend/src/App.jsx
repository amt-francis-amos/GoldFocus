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
     
      {isAuthenticated && location.pathname !== "/login" && <Navbar />}
      
      <Routes>
     
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        
        
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        
     
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      <Footer />
    </div>
  );
};

export default App;
