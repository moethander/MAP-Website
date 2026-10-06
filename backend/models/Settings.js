import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    messengerPageId: {
        type: String,
        required: true,
        default: ""
    }
},{timestamps:true});

const Settings = mongoose.model('Settings',settingsSchema);
export default Settings;