
// import GalleryModel from "../models/GalleryModel.js";

// //upload image
// export const uploadImage = async (req, res) => {
//   try {
//     const files = req.files;

//     if (!files || files.length === 0) {
//       return res.status(400).json({
//         message: "No images uploaded",
//       });
//     }

//     const galleryItems = [];

//     for (const file of files) {
//       const gallery = await Gallery.create({
//         type: "image",
//         url: file.path,
//       });

//       galleryItems.push(gallery);
//     }

//     res.status(201).json(galleryItems);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// //upload video
// export const uploadVideo = async (req,res)=>{
//     try{
//         const gallery = await Gallery.create({
//             type:"video",
//             url: req.file.path,
//         });
//         res.status(201).json(gallery);
//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// };

// //save utube link
// export const addYoutube = async (req,res) => {
//     try{
//         const {url} = req.body;

//         const gallery = await Gallery.create({
//             type: "youtube",
//             url,
//         });
//         res.status(201).json(gallery);
//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// };

// //get all gallery items
// export const getGallery = async (req,res) =>{
//     try{
//         const galleries = await Gallery.find().sort({
//             createdAt: -1,
//         });
//         res.status(201).json(gallery);
//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// };

// //hide/show
// export const toggleVisibility = async(req,res) => {
//     try{
//         const gallery = await Gallery.findById(req.params.id);

//         if(!gallery){
//             return res.status(404).json({
//                 message: "Gallery item not found",
//             });
//         }
//         gallery.isVisible = !gallery.isVisible;

//         await gallery.save();

//         res.status(200).json(gallery);
//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// };

import GalleryModel from "../models/GalleryModel.js";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image(s)
export const uploadImage = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        message: "No images uploaded",
      });
    }

    const galleryItems = [];

    for (const file of files) {
      // Cloudinary သို့ stream ဖြင့် တင်ခြင်း
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { 
            folder: "map_website",
            resource_type: "auto" 
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(file.buffer);
      });

      const gallery = await GalleryModel.create({
        type: "image",
        url: result.secure_url, // Cloudinary secure_url ကို သိမ်းမည်
      });

      galleryItems.push(gallery);
    }

    res.status(201).json(galleryItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Upload video
export const uploadVideo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No video file uploaded!" });
        }

        // Cloudinary သို့ stream ဖြင့် တင်ခြင်း
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { 
              folder: "map_website",
              resource_type: "auto" 
            },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          stream.end(req.file.buffer);
        });

        const gallery = await GalleryModel.create({
            type: "video",
            url: result.secure_url, // Cloudinary secure_url ကို သိမ်းမည်
        });
        
        res.status(201).json(gallery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Save YouTube link (ဖိုင်တင်စရာမလိုဘဲ Link အတိုင်း သိမ်းဆည်းသည်)
export const addYoutube = async (req, res) => {
    try {
        const { url } = req.body;

        const gallery = await GalleryModel.create({
            type: "youtube",
            url,
        });
        res.status(201).json(gallery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all gallery items
export const getGallery = async (req, res) => {
    try {
        const galleries = await GalleryModel.find().sort({
            createdAt: -1,
        });
        res.status(200).json(galleries); // variable နာမည်နှင့် status ကို ပြင်ဆင်ထားသည်
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Hide/Show
export const toggleVisibility = async (req, res) => {
    try {
        const gallery = await GalleryModel.findById(req.params.id);

        if (!gallery) {
            return res.status(404).json({
                message: "Gallery item not found",
            });
        }
        gallery.isVisible = !gallery.isVisible;

        await gallery.save();

        res.status(200).json(gallery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};