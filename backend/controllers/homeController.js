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
      visionTitle,
      visionDescription,
      missionTitle,
      missionDescription,
      aimTitle,
      aimDescription,
      facebookLink,
      youtubeLink,
    } = req.body;

    const existingHome = await Home.findOne();

    const bannerImage = req.files && req.files["bannerImage"] 
      ? req.files["bannerImage"][0].path 
      : (existingHome ? existingHome.bannerImage : "");

    const visionImage = req.files && req.files["visionImage"] 
      ? req.files["visionImage"][0].path 
      : (existingHome ? existingHome.visionImage : "");

    const missionImage = req.files && req.files["missionImage"] 
      ? req.files["missionImage"][0].path 
      : (existingHome ? existingHome.missionImage : "");

    const updateData = {
      storyTitle,
      storyDescription,
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
    };

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