import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    banner: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    map: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Contact", ContactSchema);