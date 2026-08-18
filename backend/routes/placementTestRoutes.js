// import express from "express";
// import {
//   getPlacementTest,
//   savePlacementTest,
// } from "../controllers/placementTestController.js";

// const Testrouter = express.Router();

// Testrouter.get("/", getPlacementTest);
// Testrouter.post("/", savePlacementTest);

// export default Testrouter;

import express from "express";
import multer from "multer";
import path from "path";
import {
  getPlacementTest,
  savePlacementTest,
} from "../controllers/placementTestController.js";

// 📁 Image File သိမ်းဆည်းရန် Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // uploads folder ထဲသို့ သိမ်းပါမည်
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const Testrouter = express.Router();

Testrouter.get("/", getPlacementTest);

// 🚀 upload.single("bannerImage") ကို Middleware အဖြစ် ထည့်ပေးထားပါသည်
Testrouter.post("/", upload.single("bannerImage"), savePlacementTest);

export default Testrouter;