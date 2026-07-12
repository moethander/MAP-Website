import mongoose from "mongoose";

const placementTestSchema = new mongoose.Schema(
  {
    terms: {
      type: String,
      required: true,
    },
    testLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "PlacementTest",
  placementTestSchema
);