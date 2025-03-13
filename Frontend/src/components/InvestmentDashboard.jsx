import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvestmentDashboard = ({ userId }) => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!userId) {
      toast.error("User ID is missing.");
      setLoading(false);
      return;
    }

    const fetchInvestments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication error. Please log in.");

        const response = await axios.get(`/api/investments/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setInvestments(response.data || []);
      } catch (err) {
        setInvestments([]);
        toast.error(err.response?.data?.message || "Failed to fetch investments.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, [userId]);

  const handleInvestment = async (e) => {
    e.preventDefault();
  
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Enter a valid investment amount.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/investments",
        { userId, amount: Number(amount) }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setInvestments([...investments, response.data]);
      setAmount("");
      toast.success("Investment added successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create investment.");
    }
  };

  return (
    <div className="investment-dashboard">
      <ToastContainer />
      <h2>Investment Dashboard</h2>
      {loading ? <p>Loading...</p> : <div>{investments.length ? investments.map(inv => <p key={inv._id}>{inv.amount}</p>) : <p>No investments</p>}</div>}
    </div>
  );
};

export default InvestmentDashboard;
