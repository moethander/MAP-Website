import Course from '../models/courseModel.js'; 

export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCourse = async (req,res) => {
    try{
        const updatedCourse = 
        await Course.findByIdAndUpdate(req.params.id, req.body, {new:true});
        
        res.json(updatedCourse);
    }catch(error){
        res.status(500).json({ message: error.message});
    }
};

//add level
export const addLevel = async (req,res) => {
    try{
        const course = await Course.findByIdAndUpdate(
            req.params.courseId,
            {
                $push:{
                    levels:req.body
                }
            },
            { new:true}
        );
        res.json(course);
    }catch(err){
        res.status(500).json(err);
    }
};

export const editLevel = async (req, res) => {
  try {
    console.log("Params =>", req.params);
    console.log("Body=>", req.body);

    const { courseId, levelId } = req.params;

    const updated = await Course.findOneAndUpdate(
      { _id: courseId, "levels._id": levelId },
      {
        $set: {
          "levels.$.name": req.body.name,
          "levels.$.fee": req.body.fee,
          "levels.$.time": req.body.time,
          "levels.$.duration": req.body.duration,
          "levels.$.icon": req.body.icon
        }
      },
      { new: true }
    );

    console.log("Updated=>",updated);

    res.json(updated);
  } catch (err) {
    console.log("Error=>",err);
    res.status(500).json(err);
  }
};

export const deleteLevel = async (req, res) => {
  try {
    const { courseId, levelId } = req.params;

    const updated = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          levels: { _id: levelId }
        }
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

