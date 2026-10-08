// import express from "express";
// import multer from "multer";
// import Gallery from "../models/GalleryModel.js";
// import{
//     uploadImage,
//     uploadVideo,
//     addYoutube,
//     getGallery,
//     toggleVisibility,
// }from "../controllers/galleryController.js";

// const GalleryRouter = express.Router();

// //file storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, "uploads/");
//     },

//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });

// const upload = multer ({storage});

// //get banner image
// GalleryRouter.get("/banner", async(req,res) => {
//   try{
//     const banner = await Gallery.findOne({type: "banner"}).sort({createdAt: -1});
//     res.status(200).json(banner ? {url: banner.url}:{url: ""});

//   }catch(error){
//     res.status(500).json({message: error.message});
//   }
// });

// //post banner image
// GalleryRouter.post("/banner", upload.single("banner"), async(req,res)=>{
//   try{
//     if(!req.file){
//       return res.status(400).json({message: "No file uploaded"});
//     }
//     await Gallery.deleteMany({type: "banner"});

//     const bannerItem = new Gallery({
//       type: "banner",
//       url: req.file.path.replace(/\\/g, "/"),
//     });
//     await bannerItem.save();

//     res.status(200).json({
//       message: "Banner updated successfully",
//       url: bannerItem.url,
//     });
//   }catch(error){
//     res.status.apply(500).json({message: error.message});
//   }
// });

// //image upload
// GalleryRouter.post("/image", upload.array("images", 20), async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({
//         message: "No files uploaded",
//       });
//     }

//     const items = [];

//     for (const file of req.files) {
//       const item = await Gallery.create({
//         type: "image",
//         url: file.path,
//       });

//       items.push(item);
//     }

//     res.status(201).json(items);

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// //video upload
// GalleryRouter.post("/video", upload.single("video"), async(req,res)=>{
//     try{
//         if(!req.file){
//             return res.status(400).json({message: "File no"});
//         }
//         const item = new Gallery({
//         type: "video",
//         url: req.file.path,
//     });
//     await item.save();
//     res.json(item);
//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// });

// //utube link
// GalleryRouter.post("/youtube",async (req,res)=>{
//     const {url} = req.body;

//     const newItem = new Gallery({
//         type: "youtube",
//         url,
//     });
//     await newItem.save();
//     res.json(newItem);
// });

// //get all
// GalleryRouter.get("/", async(req,res)=>{

//     try {
//        const data = await Gallery.find().sort({ createdAt: -1 });
// res.status(200).json(data);
//     } catch (error) {
//         console.log(error); // Terminal မှာ Error ပေါ်လာအောင် ဒီမှာ Console ထည့်ထားပါ
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// //toggle
// GalleryRouter.put("/toggle/:id", async (req, res) => {
//   try {
//     const item = await Gallery.findById(req.params.id);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     item.isVisible = !item.isVisible;
//     await item.save();

//     res.json(item);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //delete
// GalleryRouter.delete("/:id", async (req, res) => {
//   try {
//     const deletedItem = await Gallery.findByIdAndDelete(req.params.id);

//     if (!deletedItem) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     res.json({
//       success: true,
//       message: "Deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default GalleryRouter;
import express from "express";
import multer from "multer";
import Gallery from "../models/GalleryModel.js";
import { v2 as cloudinary } from "cloudinary";
import {
    uploadImage,
    uploadVideo,
    addYoutube,
    getGallery,
    toggleVisibility,
} from "../controllers/galleryController.js";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const GalleryRouter = express.Router();

// 📸 Multer Memory Storage Setup (Vercel အတွက် ပြင်ဆင်ခြင်း)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB file size limit
});

// Helper function: Cloudinary သို့ buffer မှ တဆင့် တင်ပေးမည့် function
const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { 
        folder: "map_website",
        resource_type: "auto" 
      },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );
    stream.end(fileBuffer);
  });
};

//get banner image
GalleryRouter.get("/banner", async(req,res) => {
  try{
    const banner = await Gallery.findOne({type: "banner"}).sort({createdAt: -1});
    res.status(200).json(banner ? {url: banner.url}:{url: ""});
  }catch(error){
    res.status(500).json({message: error.message});
  }
});

//post banner image (Cloudinary stream သုံး၍ တင်ခြင်း)
GalleryRouter.post("/banner", upload.single("banner"), async(req,res)=>{
  try{
    if(!req.file){
      return res.status(400).json({message: "No file uploaded"});
    }
    await Gallery.deleteMany({type: "banner"});

    const secureUrl = await uploadToCloudinary(req.file.buffer);

    const bannerItem = new Gallery({
      type: "banner",
      url: secureUrl,
    });
    await bannerItem.save();

    res.status(200).json({
      message: "Banner updated successfully",
      url: bannerItem.url,
    });
  }catch(error){
    res.status(500).json({message: error.message});
  }
});

//image upload (Cloudinary stream သုံး၍ Multiple images တင်ခြင်း)
GalleryRouter.post("/image", upload.array("images", 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded",
      });
    }

    const items = [];

    for (const file of req.files) {
      const secureUrl = await uploadToCloudinary(file.buffer);

      const item = await Gallery.create({
        type: "image",
        url: secureUrl,
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

//video upload (Cloudinary stream သုံး၍ Video တင်ခြင်း)
GalleryRouter.post("/video", upload.single("video"), async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({message: "File no"});
        }
        
        const secureUrl = await uploadToCloudinary(req.file.buffer);

        const item = new Gallery({
          type: "video",
          url: secureUrl,
        });
        await item.save();
        res.json(item);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

//utube link
GalleryRouter.post("/youtube", async (req,res)=>{
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
        console.log(error);
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