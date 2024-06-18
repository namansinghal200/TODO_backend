// import mongoose from "mongoose";
// const TaskSchema = mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     type: {
//       type: String,
//       enums: ["default", "personal", "shopping", "wishlist", "work"],
//       default: "default",
//     },
//     status: {
//       type: String,
//       enums: ["pending", "completed"],
//       default: "pending",
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     time: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Task", TaskSchema);

import mongoose from "mongoose";

// Define Subtask Schema
const SubtaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Define Task Schema
const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: [String], //made it array
      required: true,
    },
    type: {
      type: String,
      enum: ["default", "personal", "shopping", "wishlist", "work"],
      default: "default",
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    subtasks: [
      {
        name: { type: String, required: true },
        completed: { type: Boolean, default: false },
        priority: {
          type: String,
          enum: ["High", "Medium", "Low"],
          default: "Low",
        },
      },
    ], // Embed Subtask Schema
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
