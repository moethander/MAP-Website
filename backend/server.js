import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import resultRouter from './routes/resultRoutes.js';
import questionsRouter from './routes/questionsRoutes.js';
import CourseRouter from './routes/courseRoutes.js';
import ActivityRouter from './routes/activityRoutes.js';
import path from 'path';
import uploadRouter from './routes/uploadRoutes.js';
import GalleryRouter from './routes/galleryRoutes.js';
import faqRouter from './routes/faqRoutes.js';
import ContactRouter from "./routes/contactRoutes.js";
import placementTestModel from './models/placementTestModel.js';
import Testrouter from './routes/placementTestRoutes.js';
import homeRouter from './routes/homeRoutes.js';

const app = express();
const port = 4000;


//Middleware
app.use((cors()));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/uploads",express.static("uploads"));

//DB
connectDB();

//Routes
app.use('/api/auth', userRouter);
app.use('/api/results', resultRouter);
app.use('/api/questions',questionsRouter);
app.use('/api/courses', CourseRouter);
app.use('/api/activities', ActivityRouter);
app.use('/api/upload',uploadRouter);
app.use('/api/gallery', GalleryRouter);
app.use('/api/faqs', faqRouter);
app.use("/api/contact", ContactRouter);
app.use("/api/placement-test", Testrouter);
app.use("/api/home" , homeRouter);

app.get('/', (req,res)=>{
    res.send('API WORK');
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})

