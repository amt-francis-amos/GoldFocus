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
      console.log("Fetching investment details for userId:", userId); // Debugging userId

      if (!userId) {
        console.error("User ID is missing. Skipping API call.");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      console.log("Retrieved token:", token); // Debugging token

      if (!token) {
        console.error("Authorization token is missing.");
        setError("Authentication error: Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const url = `https://goldfocus-backend.onrender.com/api/investments/${userId}`;
        console.log("Making GET request to:", url); // Debugging API call

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API response:", response.data); // Debugging API response
        setInvestment(response.data);
      } catch (error) {
        console.error("Error fetching investment details:", error);
        if (error.response) {
          console.log("Error response data:", JSON.stringify(error.response.data, null, 2));
          console.log("Error response status:", error.response.status);
        }
        if (error.response?.status === 404) {
          setError("No investment found.");
        } else {
          setError(
            error.response?.data?.message || "Failed to fetch investment details."
          );
        }
      } finally {
        setLoading(false);
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

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authentication error: Please log in again.");
      return;
    }

    try {
      const payload = {
        amount: Number(amount), // ✅ Removed `userId` if backend uses authentication
        investmentDate: new Date().toISOString(),
      };
      console.log("Sending investment payload:", payload); // Debugging investment payload

      const response = await axios.post(
        "https://goldfocus-backend.onrender.com/api/investments",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Investment created successfully:", response.data); // Debugging API response
      setInvestment(response.data);
      setAmount("");
      setError("");
    } catch (error) {
      console.error("Error creating investment:", error);
      if (error.response) {
        console.log("Error response data:", JSON.stringify(error.response.data, null, 2));
        console.log("Error response status:", error.response.status);
      }
      setError(
        error.response?.data?.message || "Failed to create investment. Try again."
      );
    }
  };

  if (loading) return <p>Loading investment details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const chartData = investment?.growthData?.length
    ? investment.growthData
    : [{ date: new Date(), value: 0 }]; // ✅ Prevents chart crash if no data

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Investment Dashboard</h2>

      {/* Investment Details */}
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <p className="text-lg font-semibold">
          Total Investment: ${investment?.amount || 0}
        </p>
        <p className="text-sm text-gray-600">
          Investment Date: {investment?.investmentDate ? new Date(investment.investmentDate).toLocaleDateString() : "N/A"}
        </p>
      </div>

      {/* "On Hold" Status */}
      {investment?.status === "On Hold" && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          <p className="font-semibold">On Hold</p>
          <p className="text-sm">{investment?.holdReason || "Pending approval"}</p>
        </div>
      )}

      {/* Investment Growth Chart */}
      <h3 className="text-lg font-semibold mb-2">Investment Growth</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
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

      {/* Add New Investment Form */}
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
          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
            Invest Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvestmentDashboard;
