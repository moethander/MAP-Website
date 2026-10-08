import multer from "multer";
import path from "path";
// Vercel serverless environment အတွက် memoryStorage ကို အသုံးပြုခြင်း
const storage = multer.memoryStorage();

// ပုံ (images) နှင့် ဗီဒီယို (videos) နှစ်မျိုးစလုံးကို ခွင့်ပြုရန် file filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images and videos are allowed!"), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // ဗီဒီယိုဖိုင်များအတွက် အရွယ်အစား အများဆုံး 100MB အထိ ခွင့်ပြုသည်
});

export default upload;




// import multer from "multer";
// import path from "path";

// // storage setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// // file filter (optional)
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images allowed"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// export default upload;