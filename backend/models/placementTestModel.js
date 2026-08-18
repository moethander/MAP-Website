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
    bannerImage: {
      type: String,
      default: ""
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "PlacementTest",
  placementTestSchema
);