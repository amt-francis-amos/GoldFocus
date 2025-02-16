import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";

const App = () => {
 
  return (
    <div>
     
   <Navbar />

      <Routes>
      
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
  
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {location.pathname !== "/login" && <Footer />}
    </div>
  );
};

export default App;
