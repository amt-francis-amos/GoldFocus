import Investment from "../models/InvestmentModel.js";

export const createInvestment = async (req, res) => {
  try {
    const { userId, amount, investmentDate } = req.body;


    if (!userId || !amount) {
      return res.status(400).json({ message: "Missing required fields: userId and amount." });
    }

  
    const newInvestment = new Investment({
      userId,
      amount,
      investmentDate: investmentDate || Date.now(), 
      growthData: [], 
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
