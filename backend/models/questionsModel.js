import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correct: String,
  ageGroup: String
}, { collection: "questions" });

export default mongoose.model("Question", questionSchema);