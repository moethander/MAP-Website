import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  images: [String] ,
  theme: String,
  topic: String
});

export default mongoose.model("Activity", activitySchema);