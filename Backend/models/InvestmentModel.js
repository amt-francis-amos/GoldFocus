import mongoose from "mongoose";

const InvestmentSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  investmentDate: { type: Date, default: Date.now },
  growthData: [
    {
      date: { type: Date, required: true },
      value: { type: Number, required: true },
    },
  ],
  status: { type: String, default: "Active" },
  holdReason: { type: String, default: "" },
});

export default mongoose.model("Investment", InvestmentSchema);
