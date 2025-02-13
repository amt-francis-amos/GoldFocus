import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";

const App = () => {

 
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={ <Home /> }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
