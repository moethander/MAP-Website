
// import PlacementTest from "../models/placementTestModel.js";

// // Get placement test data
// export const getPlacementTest = async (req, res) => {
//   try {
//     const data = await PlacementTest.findOne();

//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create or Update placement test data (with Banner Image)
// export const savePlacementTest = async (req, res) => {
//   try {
//     const { terms, testLink } = req.body;

//     let data = await PlacementTest.findOne();

//     // Multer မှ တက်လာသော image file ရှိမရှိ စစ်ဆေးပါသည်
//     const bannerImage = req.file ? req.file.filename : null;

//     if (data) {
//       data.terms = terms;
//       data.testLink = testLink;

//       // ပုံအသစ် Upload တင်မှသာ bannerImage ကို update လုပ်ပါမည်
//       // (ပုံအသစ် မတင်ပါက ယခင်ပုံဟောင်း ပျောက်မသွားအောင် ထိန်းပေးထားပါသည်)
//       if (bannerImage) {
//         data.bannerImage = bannerImage;
//       }

//       await data.save();
//     } else {
//       data = await PlacementTest.create({
//         terms,
//         testLink,
//         bannerImage: bannerImage || "",
//       });
//     }

//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
import PlacementTest from "../models/placementTestModel.js";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get placement test data
export const getPlacementTest = async (req, res) => {
  try {
    const data = await PlacementTest.findOne();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or Update placement test data (Cloudinary သို့ stream ဖြင့် တင်ရန် ပြင်ဆင်ထားသည်)
export const savePlacementTest = async (req, res) => {
  try {
    const { terms, testLink } = req.body;

    let data = await PlacementTest.findOne();

    let bannerImageUrl = null;

    // Multer မှ memory buffer ဖြင့် image file ပါလာမှသာ Cloudinary သို့ တင်ပါမည်
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

      bannerImageUrl = result.secure_url; // Cloudinary secure_url ကို ယူမည်
    }

    if (data) {
      data.terms = terms;
      data.testLink = testLink;

      // ပုံအသစ် Upload တင်မှသာ bannerImage ကို update လုပ်ပါမည်
      // (ပုံအသစ် မတင်ပါက ယခင်ပုံဟောင်း ပျောက်မသွားအောင် ထိန်းပေးထားပါသည်)
      if (bannerImageUrl) {
        data.bannerImage = bannerImageUrl;
      }

      await data.save();
    } else {
      data = await PlacementTest.create({
        terms,
        testLink,
        bannerImage: bannerImageUrl || "",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};