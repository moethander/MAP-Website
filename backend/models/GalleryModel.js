import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  type: {
    type: String, // "image" | "video" | "youtube"
    enum: ["image","video","youtube"],
    required: true,
  },
  url:{
    type: String,
    required: true,
  }, 
  
  isVisible:{
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

export default mongoose.model("Gallery", gallerySchema);