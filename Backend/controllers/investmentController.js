import Investment from "../models/InvestmentModel.js";
import mongoose from "mongoose";

// Create or Update Investment
export const createInvestment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, amount, investmentDate, status, holdReason } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ message: "Missing required fields: userId and amount." });
    }

    // Create a new investment instead of modifying the existing one
    const initialDate = new Date(investmentDate || Date.now());
    const growthData = [];

    for (let i = 0; i < 10; i++) {
      const newDate = new Date(initialDate);
      newDate.setDate(newDate.getDate() + i * 30);
      const growthValue = amount * (1 + 0.02 * i);
      growthData.push({ date: newDate, value: growthValue });
    }

    const newInvestment = new Investment({
      userId,
      amount,
      investmentDate: initialDate,
      growthData,
      status: status || "Active",
      holdReason: holdReason || "",
    });

    const savedInvestment = await newInvestment.save({ session });
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json(savedInvestment);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Error creating investment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Get User Investments
export const getUserInvestments = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const investment = await Investment.findOne({ userId });

    if (!investment) {
      return res.status(404).json({ message: "No investments found for this user." });
    }

    return res.status(200).json(investment);
  } catch (error) {
    console.error("Error fetching user investments:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const holdInvestment = async (req, res) => {
  try {
    const { id } = req.params;
    const { holdReason } = req.body;

    if (!holdReason) {
      return res.status(400).json({ message: "Hold reason is required." });
    }

    const investment = await Investment.findById(id);
    if (!investment) {
      return res.status(404).json({ message: "Investment not found." });
    }

    investment.status = "On Hold";
    investment.holdReason = holdReason;

    await investment.save();
    return res.status(200).json(investment);
  } catch (error) {
    console.error("Error updating investment hold status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const continueInvestment = async (req, res) => {
  try {
    const { id } = req.params;

    const investment = await Investment.findById(id);
    if (!investment) {
      return res.status(404).json({ message: "Investment not found." });
    }

    if (investment.status !== "On Hold" && investment.status !== "Closed") {
      return res.status(400).json({ message: "Investment is already active." });
    }

    investment.status = "Active";
    investment.holdReason = "";

    await investment.save();
    return res.status(200).json({ message: "Investment has been reactivated.", investment });
  } catch (error) {
    console.error("Error reactivating investment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
