// import Contact from "../models/ContactModel.js";

// // Get Contact
// export const getContact = async (req, res) => {
//   try {
//     const contact = await Contact.findOne();

//     res.status(200).json(contact);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // Save / Update Contact
// export const saveContact = async (req, res) => {
//   try {
//     const { phone, address, map } = req.body;

//     let contact = await Contact.findOne();

//     // Banner Image
//     let banner = "";

//     if (req.file) {
//       banner = req.file.path;
//     }

//     if (!contact) {
//       contact = await Contact.create({
//         banner,
//         phone,
//         address,
//         map,
//       });
//     } else {
//       contact.phone = phone;
//       contact.address = address;
//       contact.map = map;

//       if (req.file) {
//         contact.banner = banner;
//       }

//       await contact.save();
//     }

//     res.status(200).json(contact);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
import Contact from "../models/ContactModel.js";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get Contact
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Save / Update Contact (Cloudinary သို့ တိုက်ရိုက်တင်ရန် ပြင်ဆင်ထားသည်)
export const saveContact = async (req, res) => {
  try {
    const { phone, address, map } = req.body;

    let contact = await Contact.findOne();

    let bannerUrl = contact ? contact.banner : "";

    // ဖိုင်ပါလာမှသာ Cloudinary ဆီသို့ stream ဖြင့် တင်မည်
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

      bannerUrl = result.secure_url; // Cloudinary secure_url ကို ယူမည်
    }

    if (!contact) {
      contact = await Contact.create({
        banner: bannerUrl,
        phone,
        address,
        map,
      });
    } else {
      contact.phone = phone;
      contact.address = address;
      contact.map = map;
      contact.banner = bannerUrl;

      await contact.save();
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};