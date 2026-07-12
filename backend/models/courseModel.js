import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
  name: String,
  fee: String,
  time: String,
  icon: String,
  duration: String
});

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  icon: String,
  startDate: String,
  levels: [levelSchema]
});

export default mongoose.model("Course", courseSchema);