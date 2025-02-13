import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";

const App = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();

  return (
    <div>

      {isAuthenticated && location.pathname !== "/login" && <Navbar />}

      <Routes>
       
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />

        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />

        {isAuthenticated ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </>
        ) : (
          <>
     
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
