import mongoose, { mongo } from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Success connected to MongoDB")
    } catch (error) {
        console.log("Connect to MongoDB Error! : ", error)
    }
}