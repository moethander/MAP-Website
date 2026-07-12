import express from "express";
import Activity from "../models/activityModel.js";

const ActivityRouter = express.Router();

// Add Activity
ActivityRouter.post("/", async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();

    res.status(201).json(activity);
  } catch (error) {

    res.status(500).json({ message: error.message });
  }
});

// Get All Activities
ActivityRouter.get("/", async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//delete
ActivityRouter.delete("/:id", async(req,res)=>{
  try{
    await Activity.findByIdAndDelete(req.params.id);
    res.json({message: "Activity delected"});
  }catch(error){
    console.log(error);
    res.status(500).json({message:error.message});
  }
});

//edit
ActivityRouter.put("/:id", async (req, res) => {
  try {
    const updated = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default ActivityRouter;