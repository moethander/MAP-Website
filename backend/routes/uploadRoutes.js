import express from "express";
import upload from "../middleware/upload.js";
import { v2 as cloudinary } from "cloudinary";

const uploadRouter = express.Router();

// Cloudinary configuration (환경변း / Environment variables မှ အလိုအလျောက် ယူပါလိမ့်မည်)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Image နှင့် Video များကို Cloudinary သို့ တင်ရန် Route
uploadRouter.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const imageUrls = [];

    for (const file of req.files) {
      // Memory Storage မှ buffer ကို Cloudinary သို့ stream ဖြင့် တင်ခြင်း
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { 
            folder: "map_website",
            resource_type: "auto" // ပုံဖြစ်စေ၊ ဗီဒီယိုဖြစ်စေ အလိုအလျောက် ခွဲခြားသတ်မှတ်ပေးသည်
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(file.buffer);
      });

      imageUrls.push(result.secure_url);
    }

    res.json({ imageUrls });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default uploadRouter;

// // image upload
// uploadRouter.post("/", upload.array("images",10), (req, res) => {
//   try {
//     const imageUrls = req.files.map(
//         (file) =>  `http://localhost:4000/uploads/${file.filename}`

//     );

//     res.json({ imageUrls });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });