// import express from "express";
// import multer from "multer";
// import path from "path";
// import Course from "../models/courseModel.js";
// import { deleteCourse , updateCourse , addLevel, editLevel, deleteLevel } from "../controllers/courseController.js";

// const storage = multer.diskStorage({

//   destination: function(req, file, cb){
//     cb(null, "uploads/");
//   },

//   filename: function(req, file, cb){
//     cb(
//       null,
//       Date.now() + path.extname(file.originalname)
//     );
//   }

// });

// const upload = multer({
//   storage: storage
// });


// const CourseRouter = express.Router();

// CourseRouter.post("/", upload.single("image"), async (req, res) => {
//     console.log("post hit");
//     console.log("body:",req.body);

//   try {
//     console.log(req.body);
//     const course = new Course({

//   name: req.body.name,

//   description: req.body.description,

//   startDate: req.body.startDate,

//   image: req.file 
//     ? req.file.filename 
//     : ""

// });
//     await course.save();

//     res.status(201).json(course);
//   } catch (error) {
//     console.log("ERROR:",error);
//     res.status(500).json({ message: error.message });
//   }
// });

// CourseRouter.get("/", async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //level
// CourseRouter.get("/:id", async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);

//     console.log("COURSE:", course); // 👈 check

//     res.json(course);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// CourseRouter.post("/:id/levels", async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);

//     course.levels.push(req.body); 
//     await course.save();

//     res.json(course);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //admin coursedelete
// CourseRouter.delete("/:id" , deleteCourse);

// //admin courseedit
// CourseRouter.put("/:id", upload.single("image"), updateCourse);

// //add level
// CourseRouter.post("/:courseId/levels", addLevel);

// //edit level
// CourseRouter.put("/:courseId/levels/:levelId", editLevel);

// //delete level
// CourseRouter.delete("/:courseId/levels/:levelId", deleteLevel);

// export default CourseRouter;

import express from "express";
import multer from "multer";
import Course from "../models/courseModel.js";
import { deleteCourse , updateCourse , addLevel, editLevel, deleteLevel } from "../controllers/courseController.js";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Memory Storage Setup (Vercel အတွက် ပြင်ဆင်ခြင်း)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB file size limit
});

const CourseRouter = express.Router();

CourseRouter.post("/", upload.single("image"), async (req, res) => {
    console.log("post hit");
    console.log("body:", req.body);

  try {
    let imageUrl = "";

    // Cloudinary သို့ memory buffer မှ တဆင့် တင်ခြင်း
    if (req.file) {
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

      imageUrl = result.secure_url; // Cloudinary secure_url ကို ယူမည်
    }

    const course = new Course({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      image: imageUrl
    });

    await course.save();

    res.status(201).json(course);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

CourseRouter.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//level
CourseRouter.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    console.log("COURSE:", course); // 👈 check

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

CourseRouter.post("/:id/levels", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    course.levels.push(req.body); 
    await course.save();

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//admin coursedelete
CourseRouter.delete("/:id" , deleteCourse);

//admin courseedit
CourseRouter.put("/:id", upload.single("image"), updateCourse);

//add level
CourseRouter.post("/:courseId/levels", addLevel);

//edit level
CourseRouter.put("/:courseId/levels/:levelId", editLevel);

//delete level
CourseRouter.delete("/:courseId/levels/:levelId", deleteLevel);

export default CourseRouter;