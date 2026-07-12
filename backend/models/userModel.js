import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    password: { type: String, required: false }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);