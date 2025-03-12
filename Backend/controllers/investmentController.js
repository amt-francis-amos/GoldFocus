import Investment from "../models/InvestmentModel.js";

export const createInvestment = async (req, res) => {
  try {
    const { userId, amount, investmentDate } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ message: "Missing required fields: userId and amount." });
    }

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
  } catch (error) {
    console.error("Error creating investment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
