import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: String,
     userId: String,
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    time: String,
    linkedClient: String,
    type: {
      type: String,
      default: "task",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Task ||
  mongoose.model("Task", TaskSchema);