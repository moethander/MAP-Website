// import express from "express";
// import multer from "multer";
// import About from "../models/aboutModel.js";

// const AboutRouter = express.Router();

// // Multer Storage Setup
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // 📥 Get About Data (Public)
// AboutRouter.get("/", async function (req, res) {
//   try {
//     let about = await About.findOne();
//     if (!about) {
//       about = await About.create({
//         storyDescription: "Myanmar Academic Planet အကြောင်း...",
//         aim: "ကျောင်းသားများအတွက်...",
//         mission: "ခေတ်မီ နည်းစနစ်များဖြင့်...",
//         vision: "ယုံကြည်စိတ်ချရဆုံး...",
//       });
//     }
//     res.json(about);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // 📤 Update About Data (Admin Only)
// AboutRouter.put("/", upload.single("image"), async function (req, res) {
//   try {
//     let about = await About.findOne();
//     if (!about) {
//       about = new About();
//     }

//     about.storyDescription = req.body.storyDescription;
//     about.aim = req.body.aim;
//     about.mission = req.body.mission;
//     about.vision = req.body.vision;

//     if (req.file) {
//       // ⚠️ Windows path အနောက်စလရှ် (\) များကို ရှေ့စလရှ် (/) သို့ ပြောင်းပေးရန်
//       about.imageUrl = req.file.path.replace(/\\/g, "/");
//     }

//     await about.save();
//     res.json({ message: "About Us updated successfully!", about });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Router ကို တိုက်ရိုက် export လုပ်ပါ
// export default AboutRouter;

import express from "express";
import multer from "multer";
import About from "../models/aboutModel.js";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const AboutRouter = express.Router();

// Memory Storage သုံးရန် ပြင်ဆင်ခြင်း (Vercel အတွက်)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// 📥 Get About Data (Public)
AboutRouter.get("/", async function (req, res) {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({
        storyDescription: "Myanmar Academic Planet အကြောင်း...",
        aim: "ကျောင်းသားများအတွက်...",
        mission: "ခေတ်မီ နည်းစနစ်များဖြင့်...",
        vision: "ယုံကြည်စိတ်ချရဆုံး...",
      });
    }
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📤 Update About Data (Admin Only - Cloudinary stream သုံး၍ တင်ခြင်း)
AboutRouter.put("/", upload.single("image"), async function (req, res) {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About();
    }

    about.storyDescription = req.body.storyDescription;
    about.aim = req.body.aim;
    about.mission = req.body.mission;
    about.vision = req.body.vision;

    if (req.file) {
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

      about.imageUrl = result.secure_url; // Cloudinary secure_url ကို သိမ်းမည်
    }

    await about.save();
    res.json({ message: "About Us updated successfully!", about });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Router ကို တိုက်ရိုက် export လုပ်ပါ
export default AboutRouter;