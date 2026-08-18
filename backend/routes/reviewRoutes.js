import express from "express";
import Review from "../models/reviewModel.js";

const reviewRouter = express.Router();


// User submit review
reviewRouter.post("/", async (req, res) => {
  try {
    const review = new Review(req.body);

    await review.save();

    res.status(201).json({
      message: "Review submitted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Get approved reviews (User side)
reviewRouter.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({
      approved: true,
    });

    res.json(reviews);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get all reviews (Admin)
reviewRouter.get("/all", async (req, res) => {
  try {

    const reviews = await Review.find()
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// Approve review
reviewRouter.put("/:id/approve", async (req, res) => {

  try {

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        approved: true
      },
      {
        new: true
      }
    );

    res.json(review);


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});


// Delete review
reviewRouter.delete("/:id", async(req,res)=>{

  try{

    await Review.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:"Review deleted"
    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});
export default reviewRouter;