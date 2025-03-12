import express from "express";
import Investment from "../models/InvestmentModel.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log(`Fetching investment for user ID: ${userId}`);
  
      const investment = await Investment.findOne({
        userId: mongoose.Types.ObjectId(userId),
      });
  
      if (!investment) return res.status(404).json({ message: "No investment found" });
  
      res.json(investment);
    } catch (err) {
      console.error("Error fetching investment:", err);
      res.status(500).json({ error: err.message });
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
    res.json(investment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
