
import GalleryModel from "../models/GalleryModel.js";

//upload image
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
      const gallery = await Gallery.create({
        type: "image",
        url: file.path,
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

//upload video
export const uploadVideo = async (req,res)=>{
    try{
        const gallery = await Gallery.create({
            type:"video",
            url: req.file.path,
        });
        res.status(201).json(gallery);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

//save utube link
export const addYoutube = async (req,res) => {
    try{
        const {url} = req.body;

        const gallery = await Gallery.create({
            type: "youtube",
            url,
        });
        res.status(201).json(gallery);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

//get all gallery items
export const getGallery = async (req,res) =>{
    try{
        const galleries = await Gallery.find().sort({
            createdAt: -1,
        });
        res.status(201).json(gallery);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

//hide/show
export const toggleVisibility = async(req,res) => {
    try{
        const gallery = await Gallery.findById(req.params.id);

        if(!gallery){
            return res.status(404).json({
                message: "Gallery item not found",
            });
        }
        gallery.isVisible = !gallery.isVisible;

        await gallery.save();

        res.status(200).json(gallery);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};