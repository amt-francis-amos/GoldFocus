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
        setError(err.response?.data?.message || "Failed to fetch investment.");
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

      const response = await axios.post(
        "https://goldfocus-backend.onrender.com/api/investments",
        investmentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setInvestment(response.data);
      setAmount("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create investment.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Investment Dashboard</h2>

      {investment ? (
        <>
          <div className="p-4 bg-gray-100 rounded-lg mb-4">
            <p className="text-lg font-semibold">Total Investment: ${investment.amount}</p>
            <p className="text-sm text-gray-600">
              Date: {new Date(investment.investmentDate).toLocaleDateString()}
            </p>
            <p className="text-sm font-medium">
              Status:{" "}
              <span className={`px-2 py-1 rounded ${investment.status === "Active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                {investment.status}
              </span>
            </p>
            {investment.holdReason && (
              <p className="text-sm text-red-500 mt-1">Hold Reason: {investment.holdReason}</p>
            )}
          </div>

          <h3 className="text-lg font-semibold mb-2">Investment Growth</h3>
          {investment.growthData?.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={investment.growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No growth data available.</p>
          )}
        </>
      ) : (
        <p className="text-gray-500 text-center">No investment found. Create one below.</p>
      )}
    </div>
  );
};

export default InvestmentDashboard;
