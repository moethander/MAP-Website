// import express from "express";
// import multer from "multer";
// import path from "path";
// import { getHome, saveHome } from "../controllers/homeController.js";

// const homeRouter = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// const cpUpload = upload.fields([
//   { name: "bannerImage", maxCount: 1 },
//   { name: "visionImage", maxCount: 1 },
//   { name: "missionImage", maxCount: 1 },
//   { name: "feature1Image", maxCount: 1 },
//   { name: "feature2Image", maxCount: 1 },
//   { name: "feature3Image", maxCount: 1 },
// ]);

// homeRouter.get("/", getHome);

// homeRouter.post("/", cpUpload, saveHome);

// export default homeRouter;
import express from "express";
import multer from "multer";
import { getHome, saveHome } from "../controllers/homeController.js";

const homeRouter = express.Router();

// 📸 Multer Memory Storage Setup (Vercel အတွက် ပြင်ဆင်ခြင်း)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB file size limit
});

const cpUpload = upload.fields([
  { name: "bannerImage", maxCount: 1 },
  { name: "visionImage", maxCount: 1 },
  { name: "missionImage", maxCount: 1 },
  { name: "feature1Image", maxCount: 1 },
  { name: "feature2Image", maxCount: 1 },
  { name: "feature3Image", maxCount: 1 },
]);

homeRouter.get("/", getHome);

homeRouter.post("/", cpUpload, saveHome);

export default homeRouter;