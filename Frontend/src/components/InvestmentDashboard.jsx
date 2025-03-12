import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const InvestmentDashboard = ({ userId }) => {
  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvestmentDetails = async () => {
  if (!userId) {
    console.error("User ID is missing. Skipping API call.");
    return;
  }

  try {
    const token = localStorage.getItem("authToken"); 
    const response = await axios.get(
      `https://goldfocus-backend.onrender.com/api/investments/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` }, 
      }
    );

    setInvestment(response.data);
  } catch (error) {
    console.error("Error fetching investment details:", error);
  }
};


    fetchInvestmentDetails();
  }, [userId]);

  const createInvestment = async (e) => {
    e.preventDefault(); 

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid investment amount.");
      return;
    }

    try {
      const response = await axios.post(
        "https://goldfocus-backend.onrender.com/api/investments",
        {
          userId: userId,
          amount: Number(amount),
          investmentDate: new Date().toISOString(),
        }
      );

      setInvestment(response.data); 
      setAmount(""); 
      setError("");
    } catch (error) {
      console.error("Error creating investment:", error);
      setError("Failed to create investment. Try again.");
    }
  };

  if (loading) return <p>Loading investment details...</p>;
  if (!investment) return <p>No investment found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Investment Dashboard</h2>

      {/* Investment Details */}
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <p className="text-lg font-semibold">Total Investment: ${investment.amount}</p>
        <p className="text-sm text-gray-600">
          Investment Date: {new Date(investment.investmentDate).toLocaleDateString()}
        </p>
      </div>

      {/* "On Hold" Status */}
      {investment.status === "On Hold" && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          <p className="font-semibold">On Hold</p>
          <p className="text-sm">{investment.holdReason || "Pending approval"}</p>
        </div>
      )}

      {/* Investment Growth Chart */}
      <h3 className="text-lg font-semibold mb-2">Investment Growth</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={investment.growthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      {/* 🟢 Add New Investment Form */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Add Investment</h3>
        <form onSubmit={createInvestment} className="flex flex-col space-y-3">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 border rounded"
            placeholder="Enter investment amount"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
            Invest Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvestmentDashboard;
