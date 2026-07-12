import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  bannerImage: {
    type: String,
  },

  storyTitle: {
    type: String,
    default: "OUR STORY",
  },

  storyDescription: {
    type: String,
  },

  visionImage: {
    type: String,
  },

  visionTitle: {
    type: String,
    default: "OUR VISION",
  },

  visionDescription: {
    type: String,
  },

  missionImage: {
    type: String,
  },

  missionTitle: {
    type: String,
    default: "OUR VISION",
  },

  missionDescription: {
    type: String,
  },

  aimTitle: {
    type: String,
    default: "OUR STORY",
  },

  aimDescription: {
    type: String,
  },

  facebookLink: {
    type: String,
  },

  youtubeLink: {
    type: String,
  },
});

const Home = mongoose.model("Home", homeSchema);

export default Home;