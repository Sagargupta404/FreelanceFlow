import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  client: String,
  total: Number,
  paid: Number,
  remaining: Number,
  duration: String,
  date: String,
  notes: String,
  paymentStatus: String,
  workStatus: String,
  userId: String,
}, { timestamps: true });

export default mongoose.models.Invoice ||
  mongoose.model("Invoice", InvoiceSchema);