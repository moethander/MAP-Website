import express from "express";
import upload from "../middleware/upload.js";

const uploadRouter = express.Router();

// image upload
uploadRouter.post("/", upload.array("images",10), (req, res) => {
  try {
    const imageUrls = req.files.map(
        (file) =>  `http://localhost:4000/uploads/${file.filename}`

    );

    res.json({ imageUrls });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default uploadRouter;