// import express from "express";
// import multer from "multer";
// import {
//   getContact,
//   saveContact,
// } from "../controllers/contactController.js";

// const ContactRouter = express.Router();

// // Storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // Get Contact
// ContactRouter.get("/", getContact);

// // Save / Update Contact
// ContactRouter.post("/", upload.single("banner"), saveContact);

// export default ContactRouter;

import express from "express";
import multer from "multer";
import {
  getContact,
  saveContact,
} from "../controllers/contactController.js";

const ContactRouter = express.Router();

// 📸 Multer Memory Storage Setup (Vercel အတွက် ပြင်ဆင်ခြင်း)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB file size limit
});

// Get Contact
ContactRouter.get("/", getContact);

// Save / Update Contact (Memory storage ဖြင့် Cloudinary သို့ တိုက်ရိုက် stream လုပ်မည်)
ContactRouter.post("/", upload.single("banner"), saveContact);

export default ContactRouter;