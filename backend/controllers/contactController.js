import Contact from "../models/ContactModel.js";

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

// Save / Update Contact
export const saveContact = async (req, res) => {
  try {
    const { phone, address, map } = req.body;

    let contact = await Contact.findOne();

    // Banner Image
    let banner = "";

    if (req.file) {
      banner = req.file.path;
    }

    if (!contact) {
      contact = await Contact.create({
        banner,
        phone,
        address,
        map,
      });
    } else {
      contact.phone = phone;
      contact.address = address;
      contact.map = map;

      if (req.file) {
        contact.banner = banner;
      }

      await contact.save();
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};