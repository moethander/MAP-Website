import express from "express";
import multer from "multer";
import path from "path";
import {
  getBanner,
  updateBanner,
  addActivity,
  getActivities,
  deleteActivity,
  updateActivity,
} from "../controllers/activityController.js";

const ActivityRouter = express.Router();

// 📸 Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "banner-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Banner Routes
ActivityRouter.get("/banner", getBanner);
ActivityRouter.post("/banner", upload.single("bannerImage"), updateBanner);

// Activity CRUD Routes
ActivityRouter.post("/", addActivity);
ActivityRouter.get("/", getActivities);
ActivityRouter.delete("/:id", deleteActivity);
ActivityRouter.put("/:id", updateActivity);

export default ActivityRouter;