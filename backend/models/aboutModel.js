import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    storyTitle: { type: String, default: "Our Story" },
    storyDescription: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    aim: { type: String, required: true },
    mission: { type: String, required: true },
    vision: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);