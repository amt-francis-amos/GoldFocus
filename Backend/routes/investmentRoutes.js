import express from "express";
import mongoose from "mongoose";
import Investment from "../models/InvestmentModel.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`🔍 Fetching investment details for userId: ${userId}`);


    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error(`❌ Invalid user ID: ${userId}`);
      return res.status(400).json({ error: "Invalid user ID format" });
    }


    const investment = await Investment.findOne({ userId: new mongoose.Types.ObjectId(userId) });

    if (!investment) {
      console.warn(`⚠️ No investment found for userId: ${userId}`);
      return res.status(404).json({ message: "Investment not found" });
    }

    console.log(`✅ Investment found for userId: ${userId}`);
    res.json(investment);
  } catch (err) {
    console.error("🔥 Error fetching investment:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});


router.patch("/:id/hold", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, holdReason } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid investment ID format" });
    }


    if (!["Active", "On Hold"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const investment = await Investment.findByIdAndUpdate(
      id,
      { status, holdReason: status === "On Hold" ? holdReason : "" },
      { new: true }
    );

    if (!investment) {
      console.warn(`⚠️ No investment found for ID: ${id}`);
      return res.status(404).json({ message: "Investment not found" });
    }

    console.log(`✅ Investment status updated for ID: ${id}`);
    res.json(investment);
  } catch (err) {
    console.error("🔥 Error updating investment hold:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

export default router;
