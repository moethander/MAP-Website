import express from "express";
import multer from "multer";
import Gallery from "../models/GalleryModel.js";
import{
    uploadImage,
    uploadVideo,
    addYoutube,
    getGallery,
    toggleVisibility,
}from "../controllers/galleryController.js";

const GalleryRouter = express.Router();

//file storage
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer ({storage});

//image upload
GalleryRouter.post("/image", upload.array("images", 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded",
      });
    }

    const items = [];

    for (const file of req.files) {
      const item = await Gallery.create({
        type: "image",
        url: file.path,
      });

      items.push(item);
    }

    res.status(201).json(items);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//video upload
GalleryRouter.post("/video", upload.single("video"), async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({message: "File no"});
        }
        const item = new Gallery({
        type: "video",
        url: req.file.path,
    });
    await item.save();
    res.json(item);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

//utube link
GalleryRouter.post("/youtube",async (req,res)=>{
    const {url} = req.body;

    const newItem = new Gallery({
        type: "youtube",
        url,
    });
    await newItem.save();
    res.json(newItem);
});

//get all
GalleryRouter.get("/", async(req,res)=>{

    try {
       const data = await Gallery.find().sort({ createdAt: -1 });
res.status(200).json(data);
    } catch (error) {
        console.log(error); // Terminal မှာ Error ပေါ်လာအောင် ဒီမှာ Console ထည့်ထားပါ
        res.status(500).json({ message: "Server Error" });
    }
});

//toggle
GalleryRouter.put("/toggle/:id", async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.isVisible = !item.isVisible;
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete
GalleryRouter.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Gallery.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default GalleryRouter;