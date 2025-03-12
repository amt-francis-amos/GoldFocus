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
          setInvestment(null); // No investment found
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
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Enter a valid amount.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication error. Please log in.");

      const response = await axios.post(
        "https://goldfocus-backend.onrender.com/api/investments",
        { amount: Number(amount), investmentDate: new Date().toISOString() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setInvestment(response.data);
      setAmount("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create investment.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Investment Dashboard</h2>

      {investment ? (
        <>
          {/* Investment Details */}
          <div className="p-4 bg-gray-100 rounded-lg mb-4">
            <p className="text-lg font-semibold">Total: ${investment.amount}</p>
            <p className="text-sm text-gray-600">
              Date: {new Date(investment.investmentDate).toLocaleDateString()}
            </p>
          </div>

          {/* Investment Growth Chart */}
          <h3 className="text-lg font-semibold mb-2">Investment Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={investment.growthData || [{ date: new Date(), value: 0 }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </>
      ) : (
        <p className="text-gray-500">No investment found. Create one below.</p>
      )}

      {/* Add Investment Form */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Add Investment</h3>
        <form onSubmit={handleInvestment} className="flex flex-col space-y-3">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 border rounded"
            placeholder="Enter investment amount"
          />
          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
            Invest Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvestmentDashboard;
