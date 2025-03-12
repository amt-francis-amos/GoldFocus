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
    if (!userId) {
      setError("User ID is missing.");
      setLoading(false);
      return;
    }

    const fetchInvestment = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication error. Please log in.");

        const response = await axios.get(
          `https://goldfocus-backend.onrender.com/api/investments/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setInvestment(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setInvestment(null);
        } else {
          setError(err.response?.data?.message || "Failed to fetch investment.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInvestment();
  }, [userId]);

  const handleInvestment = async (e) => {
    e.preventDefault();
    setError("");

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Enter a valid investment amount.");
      return;
    }

    if (!userId) {
      setError("User ID is required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication error. Please log in.");

      const investmentData = {
        userId,
        amount: Number(amount),
        investmentDate: new Date().toISOString(),
      };

      console.log("Sending investment data:", investmentData);

      const response = await axios.post(
        "https://goldfocus-backend.onrender.com/api/investments",
        investmentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Investment created:", response.data);
      setInvestment(response.data);
      setAmount("");
    } catch (err) {
      console.error("Error creating investment:", err.response?.data);
      setError(err.response?.data?.message || "Failed to create investment.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Investment Dashboard
      </h2>

      {loading ? (
        <p className="text-gray-700 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          {investment ? (
            <div className="p-6 bg-gray-50 shadow-sm rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-700">
                Total Investment: <span className="text-green-600">${investment.amount}</span>
              </h3>
              <p className="text-sm text-gray-500">
                Date: {new Date(investment.investmentDate).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-center">No investment found. Create one below.</p>
          )}

          <h3 className="text-lg font-semibold text-gray-800 mb-4">Investment Growth</h3>
          {investment?.growthData && investment.growthData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
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
          ) : (
            <p className="text-gray-500 text-center mb-4">No growth data available.</p>
          )}

          {/* Investment Form */}
          <div className="mt-6 p-6 bg-gray-100 shadow-sm rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Investment</h3>
            <form onSubmit={handleInvestment} className="flex flex-col space-y-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter investment amount"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-5 rounded-lg transition duration-200"
              >
                Invest Now
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default InvestmentDashboard;
