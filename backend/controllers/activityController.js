// import Activity from "../models/activityModel.js";

// // Get Current Hero Banner
// export const getBanner = async (req, res) => {
//   try {
//     const banner = await Activity.findOne({ bannerImage: { $exists: true, $ne: "" } });
//     res.status(200).json(banner || {});
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Save or Update Hero Banner
// export const updateBanner = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No image file uploaded!" });
//     }

//     let banner = await Activity.findOne({ bannerImage: { $exists: true, $ne: "" } });

//     if (banner) {
//       banner.bannerImage = req.file.filename;
//       await banner.save();
//     } else {
//       banner = await Activity.create({
//         bannerImage: req.file.filename,
//         title: "Main Hero Banner",
//       });
//     }

//     res.status(200).json(banner);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ==========================================
// // 📝 ACTIVITIES CRUD CONTROLLERS
// // ==========================================

// // Add Activity
// export const addActivity = async (req, res) => {
//   try {
//     const activity = new Activity(req.body);
//     await activity.save();
//     res.status(201).json(activity);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get All Activities (Excluding Main Banner)
// export const getActivities = async (req, res) => {
//   try {
//     const activities = await Activity.find({
//       title: { $ne: "Main Hero Banner" },
//     });
//     res.json(activities);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete Activity
// export const deleteActivity = async (req, res) => {
//   try {
//     await Activity.findByIdAndDelete(req.params.id);
//     res.json({ message: "Activity deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Edit Activity
// export const updateActivity = async (req, res) => {
//   try {
//     const updated = await Activity.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
import Activity from "../models/activityModel.js";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get Current Hero Banner
export const getBanner = async (req, res) => {
  try {
    const banner = await Activity.findOne({ bannerImage: { $exists: true, $ne: "" } });
    res.status(200).json(banner || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save or Update Hero Banner (Cloudinary သို့ တိုက်ရိုက်တင်ရန် ပြင်ဆင်ထားသည်)
export const updateBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded!" });
    }

    // Cloudinary ဆီသို့ memory buffer မှ တဆင့် တင်ခြင်း
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { 
          folder: "map_website",
          resource_type: "auto" 
        },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      stream.end(req.file.buffer);
    });

    let banner = await Activity.findOne({ bannerImage: { $exists: true, $ne: "" } });

    if (banner) {
      banner.bannerImage = result.secure_url; // Cloudinary secure_url ကို သိမ်းမည်
      await banner.save();
    } else {
      banner = await Activity.create({
        bannerImage: result.secure_url, // Cloudinary secure_url ကို သိမ်းမည်
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