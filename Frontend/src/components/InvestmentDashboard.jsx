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
  const [investments, setInvestments] = useState([]);
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

        setInvestments(response.data ? [response.data] : []);
      } catch (err) {
        setInvestments([]);
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

      setInvestments([response.data]);
      setAmount("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create investment.");
    }
  };

  // Function to put an investment on hold
  const handleHoldInvestment = async (investmentId) => {
    const holdReason = prompt("Enter a reason for holding this investment:");

    if (!holdReason) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication error. Please log in.");

      const response = await fetch(
        `https://goldfocus-backend.onrender.com/api/investments/${investmentId}/hold`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ holdReason }),
        }
      );

      if (response.ok) {
        alert("Investment put on hold successfully.");
        // Update investment status locally
        setInvestments((prevInvestments) =>
          prevInvestments.map((inv) =>
            inv._id === investmentId ? { ...inv, status: "On Hold", holdReason } : inv
          )
        );
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error holding investment:", error);
    }
  };

  const combinedGrowthData = investments.flatMap((investment) =>
    investment?.growthData?.map((data) => ({
      date: new Date(data.date).toLocaleDateString(),
      value: data.value,
    })) || []
  );

  combinedGrowthData.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Investment Dashboard</h2>

      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && investments.length > 0 && (
        <>
          <div className="p-4 bg-gray-100 rounded-lg mb-6">
            <p className="text-lg font-semibold">Total Investments: ${investments[0].amount}</p>
            <p>Status: {investments[0].status}</p>
            <p>Hold Reason: {investments[0].holdReason || "None"}</p>
            {investments[0].status !== "On Hold" && (
              <button
                onClick={() => handleHoldInvestment(investments[0]._id)}
                className="bg-red-500 text-white p-2 rounded mt-4"
              >
                Hold Investment
              </button>
            )}
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
      )}

      <form onSubmit={handleInvestment} className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-center">Add Investment</h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-3 border rounded-md w-full"
          placeholder="Enter investment amount"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md w-full mt-4"
        >
          Invest Now
        </button>
      </form>
    </div>
  );
};

export default InvestmentDashboard;
