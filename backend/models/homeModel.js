import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  bannerImage: {
    type: String,
  },

  heroBadge: {type: String, default: "Myanmar Academic Planet"},
  heroTitle: { type: String, default: "Learn English With Confidence" },
  heroDescription: { type: String, default: "Improve your English skills with experienced teachers, interactive lessons, and a supportive learning environment." },

  whyChooseTitle: { type: String, default: "Building FutureThrough Education" },
  whyChooseDescription: { type: String, default: "Myanmar Academic Planet provides quality education with experienced teachers, practical learning and opportunities for students." },

  // Card 1
  feature1Image: { type: String, default: "" },
  feature1Title: { type: String, default: "Quality Education" },
  feature1Description: { type: String, default: "Modern learning methods designed to build strong knowledge and skills." },

  // Card 2
  feature2Image: { type: String, default: "" },
  feature2Title: { type: String, default: "Expert Teachers" },
  feature2Description: { type: String, default: "Learn with experienced instructors who guide students effectively." },

  // Card 3
  feature3Image: { type: String, default: "" },
  feature3Title: { type: String, default: "Professional Growth" },
  feature3Description: { type: String, default: "Develop skills and achieve certificates for future success." },

  studentsCount: { type: String, default: "500+" },
  teachersCount: { type: String, default: "15+" },
  successRate: { type: String, default: "98%" },
  yearsExperience: { type: String, default: "10+" },
  
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

  facebookLink: { type: String, default: "" },
  youtubeLink: { type: String, default: "" },
  phoneNumber: {type: String, default: "" },
  email: {type: String, default: ""},
  address: {type: String, default: ""},



});

const Home = mongoose.model("Home", homeSchema);

export default Home;