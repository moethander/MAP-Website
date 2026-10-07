import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => (console.log('DB connected')))
}
//map-website-production.up.railway.app
//mongodb+srv://myominhtaik761_db_user:SZzcfeEwda7qw5ih@cluster0.qtcvhko.mongodb.net/?appName=Cluster0