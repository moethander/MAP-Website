import express from "express";
import multer from "multer";
import FAQ from "../models/faqModel.js";

import{
    getFAQs,
    createFAQ,
    updateFAQ,
    deleteFAQ,
} from "../controllers/faqController.js";

const faqRouter = express.Router();

faqRouter.get("/",getFAQs);
faqRouter.post("/",createFAQ);
faqRouter.put("/:id",updateFAQ);
faqRouter.delete("/:id",deleteFAQ);

export default faqRouter;
