import express from "express";
import multer from "multer";
import About from "../models/aboutModel.js";

const AboutRouter = express.Router();

// Multer Storage Setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

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

// 📤 Update About Data (Admin Only)
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
      // ⚠️ Windows path အနောက်စလရှ် (\) များကို ရှေ့စလရှ် (/) သို့ ပြောင်းပေးရန်
      about.imageUrl = req.file.path.replace(/\\/g, "/");
    }

    await about.save();
    res.json({ message: "About Us updated successfully!", about });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Router ကို တိုက်ရိုက် export လုပ်ပါ
export default AboutRouter;