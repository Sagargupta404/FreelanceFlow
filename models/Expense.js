import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  vendor: String,
  purpose: String,
  priority: String,
  date: String,
  recurring: Boolean,
  taxDeductible: Boolean,
  userId: String,
}, { timestamps: true });

export default mongoose.models.Expense ||
  mongoose.model("Expense", ExpenseSchema);