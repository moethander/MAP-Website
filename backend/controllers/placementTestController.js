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

// // Create or Update placement test data
// export const savePlacementTest = async (req, res) => {
//   try {
//     const { terms, testLink } = req.body;

//     let data = await PlacementTest.findOne();

//     if (data) {
//       data.terms = terms;
//       data.testLink = testLink;

//       await data.save();
//     } else {
//       data = await PlacementTest.create({
//         terms,
//         testLink,
//       });
//     }

//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import PlacementTest from "../models/placementTestModel.js";

// Get placement test data
export const getPlacementTest = async (req, res) => {
  try {
    const data = await PlacementTest.findOne();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or Update placement test data (with Banner Image)
export const savePlacementTest = async (req, res) => {
  try {
    const { terms, testLink } = req.body;

    let data = await PlacementTest.findOne();

    // Multer မှ တက်လာသော image file ရှိမရှိ စစ်ဆေးပါသည်
    const bannerImage = req.file ? req.file.filename : null;

    if (data) {
      data.terms = terms;
      data.testLink = testLink;

      // ပုံအသစ် Upload တင်မှသာ bannerImage ကို update လုပ်ပါမည်
      // (ပုံအသစ် မတင်ပါက ယခင်ပုံဟောင်း ပျောက်မသွားအောင် ထိန်းပေးထားပါသည်)
      if (bannerImage) {
        data.bannerImage = bannerImage;
      }

      await data.save();
    } else {
      data = await PlacementTest.create({
        terms,
        testLink,
        bannerImage: bannerImage || "",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};