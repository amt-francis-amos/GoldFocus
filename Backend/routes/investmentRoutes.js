import express from "express";
import mongoose from "mongoose";
import Investment from "../models/InvestmentModel.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log(`Received request for userId: ${userId}`);

   
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error(`Invalid user ID: ${userId}`);
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const investment = await Investment.findOne({ userId: new mongoose.Types.ObjectId(userId) });

    if (!investment) {
      console.warn(`No investment found for user ID: ${userId}`);
      return res.status(404).json({ message: "Investment not found" });
    }

    res.json(investment);
  } catch (err) {
    console.error("Error fetching investment:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});


router.patch("/:id/hold", authMiddleware, async (req, res) => {
  try {
    const { status, holdReason } = req.body;
    const investment = await Investment.findByIdAndUpdate(
      req.params.id,
      { status, holdReason },
      { new: true }
    );
    
    if (!investment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    res.json(investment);
  } catch (err) {
    console.error("Error updating investment hold:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

export default router;
