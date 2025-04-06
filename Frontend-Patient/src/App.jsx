import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import Appointment from "./pages/Appointment";
import BMICalculator from "./components/BMICalculator.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { Context } from "./main";
import axios from "axios";
import Footer from "./components/footer";
import Loading from "./components/loading";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setIsAuthenticated, setUser]); // Removed isAuthenticated from deps to prevent infinite loop

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bmi" element={<BMICalculator />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;