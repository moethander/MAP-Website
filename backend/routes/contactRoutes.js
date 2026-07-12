import express from "express";
import multer from "multer";
import {
  getContact,
  saveContact,
} from "../controllers/contactController.js";

const ContactRouter = express.Router();

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Get Contact
ContactRouter.get("/", getContact);

// Save / Update Contact
ContactRouter.post("/", upload.single("banner"), saveContact);

export default ContactRouter;