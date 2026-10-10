import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import bcrypt from 'bcryptjs' // 
import { connectDB } from './config/db.js';
import Admin from './models/Admin.js'; 
import userRouter from './routes/userRoutes.js';
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
import reviewRouter from "./routes/reviewRoutes.js";
import AboutRouter from './routes/aboutRoutes.js';
import AdminRouter from './routes/adminRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: [
    'https://myanmaracademicplanet.vercel.app/',
    'https://myanmaracademicplanet.vercel.app/'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/uploads",express.static("uploads"));

// DB Connection
connectDB();

const createDefaultAdmin = async () => {
  try {
    const adminEmail = "admin@gmail.com";
    const adminExists = await Admin.findOne({ email: adminEmail });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123456", 10);
      await Admin.create({
        email: adminEmail,
        password: hashedPassword,
      });
      console.log("✅ Default Admin Created: admin@gmail.com / admin123456");
    }
  } catch (error) {
    console.error("❌ Error creating default admin:", error);
  }
};


createDefaultAdmin();

// Routes
app.use('/api/admin', AdminRouter);
app.use('/api/auth', userRouter);
app.use('/api/courses', CourseRouter);
app.use('/api/activities', ActivityRouter);
app.use('/api/upload',uploadRouter);
app.use('/api/gallery', GalleryRouter);
app.use('/api/faqs', faqRouter);
app.use('/api/about', AboutRouter);
app.use("/api/contact", ContactRouter);
app.use("/api/placement-test", Testrouter);
app.use("/api/home" , homeRouter);
app.use("/api/reviews",reviewRouter);

app.get('/', (req,res)=>{
    res.send('API WORK');
});

// Local မှာ အလုပ်လုပ်ဖို့အတွက် app.listen ကို condition ထည့်ပါ
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
  });
}

// Vercel (Production) အတွက် app ကို export ထုတ်ပေးပါ
export default app;

// app.listen(port, () => {
//     console.log(`Server Started on http://localhost:${port}`)
// })