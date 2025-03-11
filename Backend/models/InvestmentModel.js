import mongoose from "mongoose";

const InvestmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  investmentDate: { type: Date, default: Date.now },
  growthData: [{ date: Date, value: Number }], 
  status: { type: String, enum: ["Active", "On Hold"], default: "Active" },
  holdReason: { type: String, default: "" },
});

const Investment = mongoose.model("Investment", InvestmentSchema);
export default Investment;
