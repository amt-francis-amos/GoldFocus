import express from "express";
import Investment from "../models/InvestmentModel.js";
import authMiddleware from "../middlewares/auth.js";


const router = express.Router();


router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    
   
    console.log(`Fetching investment for user ID: ${userId}`);
    const investment = await Investment.findOne({ userId: userId });

    if (!investment) {
      return res.status(404).json({ message: "No investment found" });
    }

    res.json(investment);
  } catch (err) {
    console.error("Error fetching investment:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});


router.patch("/:id/hold", async (req, res) => {
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
    res.status(500).json({ error: err.message });
  }
});

export default router;
