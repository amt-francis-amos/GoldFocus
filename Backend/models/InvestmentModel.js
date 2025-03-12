import mongoose from "mongoose";

const InvestmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  investmentDate: { type: Date, default: Date.now },
  growthData: [
    {
      date: { type: Date },
      value: { type: Number },
    },
  ],
  status: { type: String, default: "Active" },
  holdReason: { type: String, default: "" },
});

export default mongoose.model("Investment", InvestmentSchema);
