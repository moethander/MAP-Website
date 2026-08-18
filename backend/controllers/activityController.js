import Activity from "../models/activityModel.js";

// Get Current Hero Banner
export const getBanner = async (req, res) => {
  try {
    const banner = await Activity.findOne({ bannerImage: { $exists: true, $ne: "" } });
    res.status(200).json(banner || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save or Update Hero Banner
export const updateBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded!" });
    }

    let banner = await Activity.findOne({ bannerImage: { $exists: true, $ne: "" } });

    if (banner) {
      banner.bannerImage = req.file.filename;
      await banner.save();
    } else {
      banner = await Activity.create({
        bannerImage: req.file.filename,
        title: "Main Hero Banner",
      });
    }

    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// 📝 ACTIVITIES CRUD CONTROLLERS
// ==========================================

// Add Activity
export const addActivity = async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Activities (Excluding Main Banner)
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({
      title: { $ne: "Main Hero Banner" },
    });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Activity
export const deleteActivity = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit Activity
export const updateActivity = async (req, res) => {
  try {
    const updated = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};