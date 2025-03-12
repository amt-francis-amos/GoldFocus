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

    let existingInvestment = await Investment.findOne({ userId }).session(session);

    if (existingInvestment) {
      existingInvestment.amount += amount;

      // Update status and holdReason if provided
      if (status) existingInvestment.status = status;
      if (holdReason !== undefined) existingInvestment.holdReason = holdReason;

      let lastGrowthDate = new Date(
        existingInvestment.growthData?.slice(-1)[0]?.date || investmentDate || Date.now()
      );

      const newGrowthData = [];

      for (let i = 1; i <= 10; i++) {
        let growthDate = new Date(lastGrowthDate);
        growthDate.setDate(growthDate.getDate() + 30);

        if (!existingInvestment.growthData.some((g) => new Date(g.date).getTime() === growthDate.getTime())) {
          const newValue = existingInvestment.amount * (1 + 0.02 * i);
          newGrowthData.push({ date: growthDate, value: newValue });
        }
      }

      existingInvestment.growthData.push(...newGrowthData);
      existingInvestment.growthData.sort((a, b) => new Date(a.date) - new Date(b.date));

      await existingInvestment.save({ session });
      await session.commitTransaction();
      session.endSession();

      return res.status(200).json(existingInvestment);
    } else {
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
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Error creating/updating investment:", error);
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
