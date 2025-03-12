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
  const [investments, setInvestments] = useState(() => {
    const savedInvestments = localStorage.getItem("investments");
    return savedInvestments ? JSON.parse(savedInvestments) : [];
  });
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing.");
      setLoading(false);
      return;
    }

    const fetchInvestments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication error. Please log in.");

        const response = await axios.get(
          `https://goldfocus-backend.onrender.com/api/investments/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (Array.isArray(response.data)) {
          setInvestments(response.data);
          localStorage.setItem("investments", JSON.stringify(response.data)); // Save investments to localStorage
        } else {
          setInvestments([]);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch investments.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, [userId]);

  const handleInvestment = async (e) => {
    e.preventDefault();
    setError("");

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Enter a valid investment amount.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication error. Please log in.");

      const response = await axios.post(
        "https://goldfocus-backend.onrender.com/api/investments",
        { userId, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedInvestments = [...investments, response.data];
      setInvestments(updatedInvestments);
      localStorage.setItem("investments", JSON.stringify(updatedInvestments)); // Save updated investments to localStorage
      setAmount("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create investment.");
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  console.log("Investments:", investments);

  const combinedGrowthData = Array.isArray(investments)
    ? investments.flatMap((investment) =>
        Array.isArray(investment?.growthData)
          ? investment.growthData.map((data) => ({
              date: new Date(data.date).toLocaleDateString(),
              value: data.value,
            }))
          : []
      )
    : [];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Investment Dashboard</h2>

      {investments.length > 0 ? (
        <>
          <div className="p-4 bg-gray-100 rounded-lg mb-6">
            <p className="text-lg font-semibold">
              Total Investments: $
              {investments.reduce((sum, inv) => sum + (inv.amount || 0), 0)}
            </p>
          </div>

          <h3 className="text-lg font-semibold mb-4">Investment Growth</h3>
          {combinedGrowthData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={combinedGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center">No growth data available.</p>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No investments found. Add one below.</p>
      )}
    </div>
  );
};

export default InvestmentDashboard;
