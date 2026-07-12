import express from "express";
import Course from "../models/courseModel.js";
import { deleteCourse , updateCourse , addLevel, editLevel, deleteLevel } from "../controllers/courseController.js";

const CourseRouter = express.Router();

CourseRouter.post("/", async (req, res) => {
    console.log("post hit");
    console.log("body:",req.body);

  try {
    console.log(req.body);
    const course = new Course(req.body);
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    console.log("ERROR:",error);
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

// //admin add
// CourseRouter.post("/", async (req, res) => {
//   const course = new Course(req.body);
//   await course.save();
//   res.json(course);
// });

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
CourseRouter.put("/:id", updateCourse);

//add level
CourseRouter.post("/:courseId/levels", addLevel);

//edit level
CourseRouter.put("/:courseId/levels/:levelId", editLevel);

//delete level
CourseRouter.delete("/:courseId/levels/:levelId", deleteLevel);

export default CourseRouter;