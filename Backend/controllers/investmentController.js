import Investment from "../models/InvestmentModel.js";

// Create or Update Investment
export const createInvestment = async (req, res) => {
  try {
    const { userId, amount, investmentDate } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ message: "Missing required fields: userId and amount." });
    }

    let existingInvestment = await Investment.findOne({ userId });

    if (existingInvestment) {
      // ✅ Update existing investment (add to amount & extend growth data)
      existingInvestment.amount += amount;

      // ✅ Extend growth tracking
      let lastGrowthDate = new Date(existingInvestment.growthData?.slice(-1)[0]?.date || investmentDate || Date.now());
      
      for (let i = 1; i <= 10; i++) {
        lastGrowthDate.setDate(lastGrowthDate.getDate() + 30); // Add 30 days per interval
        const newValue = existingInvestment.amount * (1 + 0.02 * i);
        existingInvestment.growthData.push({ date: new Date(lastGrowthDate), value: newValue });
      }

      await existingInvestment.save();
      return res.status(200).json(existingInvestment);
    } else {
      // ✅ Create a new investment if none exists
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
        status: "Active",
        holdReason: "",
      });

      const savedInvestment = await newInvestment.save();
      return res.status(201).json(savedInvestment);
    }
  } catch (error) {
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
