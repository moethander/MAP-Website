import Home from "../models/homeModel.js";

// Get Home Data
export const getHome = async (req, res) => {
  try {
    const home = await Home.findOne();

    res.status(200).json({
      success: true,
      home,
    });
  } catch (error) {
    console.log("GET ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create or Update Home Data
export const saveHome = async (req, res) => {
  try {
    const {
      storyTitle,
      storyDescription,
      heroBadge, heroTitle, heroDescription, messengerPageId,
      whyChooseTitle, whyChooseDescription,
      feature1Title, feature1Description, 
      feature2Title, feature2Description, 
      feature3Title, feature3Description, 
      studentsCount,
      teachersCount,
      successRate,
      yearsExperience,
      visionTitle,
      visionDescription,
      missionTitle,
      missionDescription,
      aimTitle,
      aimDescription,
      facebookLink,
      youtubeLink,
      phoneNumber,
      email,
      address
    } = req.body;

    const existingHome = await Home.findOne();

    // 📸 Images Parsing (အသစ်တက်ရင်ယူ၊ မတက်ရင် အဟောင်းအတိုင်းထား)
    const bannerImage = req.files && req.files["bannerImage"] 
      ? req.files["bannerImage"][0].path 
      : (existingHome ? existingHome.bannerImage : "");

    const feature1Image = req.files && req.files["feature1Image"]
      ? req.files["feature1Image"][0].path
      : (existingHome ? existingHome.feature1Image : "");

    const feature2Image = req.files && req.files["feature2Image"]
      ? req.files["feature2Image"][0].path
      : (existingHome ? existingHome.feature2Image : "");

    const feature3Image = req.files && req.files["feature3Image"]
      ? req.files["feature3Image"][0].path
      : (existingHome ? existingHome.feature3Image : "");

    const visionImage = req.files && req.files["visionImage"] 
      ? req.files["visionImage"][0].path 
      : (existingHome ? existingHome.visionImage : "");

    const missionImage = req.files && req.files["missionImage"] 
      ? req.files["missionImage"][0].path 
      : (existingHome ? existingHome.missionImage : "");

    // 📝 Database ထဲ Update လုပ်မည့် Data Object
    const updateData = {
      storyTitle,
      storyDescription,
      heroBadge, heroTitle, heroDescription, messengerPageId,
      whyChooseTitle, whyChooseDescription,
      feature1Title, feature1Description, feature1Image, 
      feature2Title, feature2Description, feature2Image,
      feature3Title, feature3Description, feature3Image,
      studentsCount,
      teachersCount,
      successRate,
      yearsExperience,
      visionTitle,
      visionDescription,
      visionImage,
      missionTitle,
      missionDescription,
      missionImage,
      aimTitle,
      aimDescription,
      bannerImage,
      facebookLink,
      youtubeLink,
      phoneNumber,
      email,
      address
    };

    // 💾 Database မှာ သွားသိမ်းခြင်း
    const savedData = await Home.findOneAndUpdate(
      {}, 
      updateData,
      { new: true, upsert: true } 
    );

    console.log("Save data", savedData);

    return res.status(200).json({ 
      success: true, 
      message: "Home data saved successfully with images!",
      home: savedData
    });

  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server Error",
      error: error.message 
    });
  }
};