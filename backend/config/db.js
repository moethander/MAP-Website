import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://myominhtaik761_db_user:SZzcfeEwda7qw5ih@cluster0.qtcvhko.mongodb.net/?appName=Cluster0')
    .then(() => (console.log('DB connected')))
}
