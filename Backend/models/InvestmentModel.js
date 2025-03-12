import mongoose from "mongoose";

const InvestmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  investmentDate: { type: Date, default: Date.now },
  growthData: [
    {
      date: { type: Date, required: true },
      value: { type: Number, required: true },
    },
  ],
  status: { type: String, enum: ["Active", "On Hold", "Closed"], default: "Active" },
  holdReason: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("Investment", InvestmentSchema);
